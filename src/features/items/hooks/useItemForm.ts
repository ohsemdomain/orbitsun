import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemCategory, ItemStatus, type ItemFormData, itemCreateSchema, itemUpdateSchema, safeParseInt } from '@shared/item';
import { priceStringToCents, priceCentsToString } from '@shared/price-utils';
import { formatZodErrors, type FormErrors } from '../../../utils/validation';
import { trpc } from '../../../trpc';

interface UseItemFormProps {
  id?: string;
  isEditing: boolean;
}

export const useItemForm = ({ id, isEditing }: UseItemFormProps) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ItemFormData>({
    item_name: '',
    item_description: '',
    item_price: '',
    item_category: ItemCategory.OTHER,
    item_unit_name: '',
    item_status: ItemStatus.ACTIVE,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Get utils for query invalidation
  const utils = trpc.useUtils();

  // tRPC mutations
  const createMutation = trpc.item.create.useMutation({
    onSuccess: () => {
      // Invalidate and refetch item queries
      utils.item.list.invalidate();
      utils.item.getAllForSearch.invalidate();
      navigate('/items');
    },
    onError: (error) => {
      console.error('Failed to create item:', error);
      alert('Failed to create item. Please try again.');
    },
  });

  const updateMutation = trpc.item.update.useMutation({
    onSuccess: () => {
      // Invalidate and refetch item queries
      utils.item.list.invalidate();
      utils.item.getAllForSearch.invalidate();
      navigate('/items');
    },
    onError: (error) => {
      console.error('Failed to update item:', error);
      alert('Failed to update item. Please try again.');
    },
  });

  // Get item data when editing
  const { data: existingItem, isLoading: isLoadingItem } = trpc.item.getById.useQuery(
    { id: id! },
    {
      enabled: isEditing && Boolean(id),
    }
  );

  // Load existing item data when editing
  useEffect(() => {
    if (existingItem) {
      setFormData({
        item_name: existingItem.item_name,
        item_description: existingItem.item_description || '',
        item_price: priceCentsToString(existingItem.item_price_cents),
        item_category: existingItem.item_category,
        item_unit_name: existingItem.item_unit_name || '',
        item_status: existingItem.item_status,
      });
    }
  }, [existingItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Clear previous errors
    setErrors({});

    // Prepare data for validation
    const priceInCents = priceStringToCents(formData.item_price);
    const validationData = {
      item_name: formData.item_name.trim(),
      item_category: formData.item_category,
      item_price_cents: priceInCents,
      item_description: formData.item_description.trim() || undefined,
      item_unit_name: formData.item_unit_name.trim() || undefined,
      ...(isEditing && { item_status: formData.item_status }),
    };

    // Validate using shared schema
    const schema = isEditing ? itemUpdateSchema.omit({ id: true }) : itemCreateSchema;
    const result = schema.safeParse(validationData);

    if (!result.success) {
      const formErrors = formatZodErrors(result.error);
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && id) {
        // Update existing item
        await updateMutation.mutateAsync({
          id,
          ...validationData,
        });
      } else {
        // Create new item  
        await createMutation.mutateAsync({
          ...validationData,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to update form data with safe parsing for enums
  const updateFormData = (field: keyof ItemFormData, value: string) => {
    if (field === 'item_category') {
      setFormData(prev => ({
        ...prev,
        [field]: safeParseInt(value, ItemCategory.OTHER) as ItemCategory
      }));
    } else if (field === 'item_status') {
      setFormData(prev => ({
        ...prev,
        [field]: safeParseInt(value, ItemStatus.ACTIVE) as ItemStatus
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return {
    // Form state
    formData,
    isSubmitting,
    errors,
    isLoadingItem,

    // Actions
    handleSubmit,
    updateFormData,
    setFormData,
  };
};