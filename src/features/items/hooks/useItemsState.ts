import { useState, useEffect, useRef } from 'react';
import { useSearch } from '../../../components/search/SearchProvider';
import type { Item } from '@shared/item';
import { trpc } from '../../../trpc';

export const useItemsState = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const { searchTerm } = useSearch();

  // State management
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // tRPC queries
  const { 
    data: itemsData, 
    isLoading: loading, 
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage
  } = trpc.item.list.useInfiniteQuery(
    { status: filter, limit: 20 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: !searchTerm, // Only fetch when not searching
    }
  );

  const { data: allItemsCache = [] } = trpc.item.getAllForSearch.useQuery(
    undefined,
    {
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  // Compute display items based on search or tRPC data
  const displayItems = searchTerm.trim() 
    ? allItemsCache.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : itemsData?.pages.flatMap(page => page.items) ?? [];

  // Calculate total count based on current filter
  const totalCount = searchTerm.trim() 
    ? displayItems.length
    : allItemsCache.filter(item => {
        if (filter === 'all') return true;
        if (filter === 'active') return item.item_status === 1;
        if (filter === 'inactive') return item.item_status === 0;
        return true;
      }).length;

  // Handle lazy loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || searchTerm || !hasNextPage || loadingMore) return;

      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom < 100) {
        fetchNextPage();
      }
    };

    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => listElement.removeEventListener('scroll', handleScroll);
    }
  }, [hasNextPage, loadingMore, searchTerm, fetchNextPage]);

  // Handle search behavior - return to 'active' when search is cleared
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilter('active');
    }
  }, [searchTerm]);

  // Auto-select first item when items change
  useEffect(() => {
    if (displayItems.length > 0 && !selectedItem) {
      setSelectedItem(displayItems[0]);
    }
    // If selected item is no longer in the list, select the first one
    if (selectedItem && displayItems.length > 0) {
      const isStillInList = displayItems.some(item => item.id === selectedItem.id);
      if (!isStillInList) {
        setSelectedItem(displayItems[0]);
      }
    }
    // Clear selection if no items
    if (displayItems.length === 0) {
      setSelectedItem(null);
    }
  }, [displayItems, selectedItem]);

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    if (searchTerm) return; // Don't allow filter change during search
    setFilter(newFilter as 'all' | 'active' | 'inactive');
  };

  // Handle item click
  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    // Show mobile detail panel on mobile
    setShowMobileDetail(true);
  };

  return {
    // State
    filter,
    selectedItem,
    showMobileDetail,
    displayItems,
    totalCount,
    loading,
    loadingMore,
    searchTerm,
    listRef,
    
    // Actions
    handleFilterChange,
    handleItemClick,
    setShowMobileDetail,
  };
};