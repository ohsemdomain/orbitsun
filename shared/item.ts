// shared/item.ts
import { z } from 'zod';

export enum ItemCategory {
  PACKAGING = 1,
  LABEL = 2,
  OTHER = 3,
}

export enum ItemStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export interface Item {
  id: string;
  item_name: string;
  item_category: ItemCategory;
  item_price_cents: number;
  item_description: string | null;
  item_unit_name: string | null;
  item_status: ItemStatus;
  created_at: number;
  updated_at: number;
  created_by: string;
  updated_by: string;
}

// Form data derived from Item interface - no duplication!
export type ItemFormData = Pick<Item, 'item_name' | 'item_category' | 'item_status'> & {
  item_price: string; // Form uses string input, Item uses number (cents)
  item_description: string; // Form uses string, Item allows null
  item_unit_name: string; // Form uses string, Item allows null
};

// API data types derived from Item interface
export type ItemCreateData = Pick<Item, 'item_name' | 'item_category' | 'item_price_cents' | 'item_description' | 'item_unit_name'>;
export type ItemUpdateData = Partial<Pick<Item, 'item_name' | 'item_category' | 'item_price_cents' | 'item_description' | 'item_unit_name' | 'item_status'>> & {
  id: string;
};

// Response types
export interface ItemListResponse {
  items: Item[];
  nextCursor?: string;
}

// Validation schemas 
export const itemCreateSchema = z.object({
  item_name: z.string().trim().min(1, 'Name is required').max(255),
  item_category: z.nativeEnum(ItemCategory),
  item_price_cents: z.number().int().min(0),
  item_description: z.string().trim().transform(val => val === '' ? null : val).nullable().optional(),
  item_unit_name: z.string().trim().min(1).max(50).transform(val => val === '' ? null : val).nullable().optional(),
});

export const itemUpdateSchema = z.object({
  id: z.string(),
  item_name: z.string().trim().min(1).max(255).optional(),
  item_category: z.nativeEnum(ItemCategory).optional(),
  item_price_cents: z.number().int().min(0).optional(),
  item_description: z.string().trim().transform(val => val === '' ? null : val).nullable().optional(),
  item_unit_name: z.string().trim().min(1).max(50).transform(val => val === '' ? null : val).nullable().optional(),
  item_status: z.nativeEnum(ItemStatus).optional(),
});

// Updated list schema - simpler
export const itemListSchema = z.object({
  status: z.enum(['all', 'active', 'inactive']).default('active'),
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(50).default(20),
});

// Utility functions
export const getCategoryLabel = (category: ItemCategory): string => {
  switch (category) {
    case ItemCategory.PACKAGING:
      return 'Packaging';
    case ItemCategory.LABEL:
      return 'Label';
    case ItemCategory.OTHER:
      return 'Other';
    default:
      return 'Unknown';
  }
};

export const getStatusLabel = (status: ItemStatus): string => {
  return status === ItemStatus.ACTIVE ? 'Active' : 'Inactive';
};

// Form options
export const CATEGORY_OPTIONS = [
  { value: ItemCategory.PACKAGING.toString(), label: 'Packaging' },
  { value: ItemCategory.LABEL.toString(), label: 'Label' },
  { value: ItemCategory.OTHER.toString(), label: 'Other' },
];

export const STATUS_OPTIONS = [
  { value: ItemStatus.ACTIVE.toString(), label: 'Active' },
  { value: ItemStatus.INACTIVE.toString(), label: 'Inactive' },
];

// Helper function to safely parse string to number with fallback
export const safeParseInt = (value: string, fallback: number): number => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};