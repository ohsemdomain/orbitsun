import { trpc } from '../lib/trpc';

// Hook for fetching items with pagination and filters
export const useItems = (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isActive?: boolean;
} = {}) => {
  return trpc.item.list.useQuery({
    page: params.page ?? 1,
    limit: params.limit ?? 10,
    search: params.search,
    category: params.category,
    isActive: params.isActive,
  });
};

// Hook for fetching a single item
export const useItem = (id: string) => {
  return trpc.item.get.useQuery(
    { id },
    {
      enabled: !!id,
    }
  );
};

// Hook for creating items
export const useCreateItem = () => {
  const utils = trpc.useUtils();
  
  return trpc.item.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch items list
      utils.item.list.invalidate();
    },
  });
};

// Hook for updating items
export const useUpdateItem = () => {
  const utils = trpc.useUtils();
  
  return trpc.item.update.useMutation({
    onSuccess: (updatedItem) => {
      // Update the specific item in the cache
      utils.item.get.setData({ id: updatedItem.id }, updatedItem);
      // Invalidate the list to ensure consistency
      utils.item.list.invalidate();
    },
  });
};

// Hook for deleting items
export const useDeleteItem = () => {
  const utils = trpc.useUtils();
  
  return trpc.item.delete.useMutation({
    onSuccess: () => {
      // Invalidate items list
      utils.item.list.invalidate();
    },
  });
};