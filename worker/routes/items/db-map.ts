import type { Item } from '@shared/item';

/**
 * Map database row to Item type
 */
export const mapRowToItem = (row: any): Item => ({
  id: row.id,
  item_name: row.item_name,
  item_category: row.item_category,
  item_price_cents: row.item_price_cents,
  item_description: row.item_description,
  item_unit_name: row.item_unit_name,
  item_status: row.item_status,
  created_at: row.created_at,
  updated_at: row.updated_at,
  created_by: row.created_by,
  updated_by: row.updated_by,
});

/**
 * Map multiple database rows to Item array
 */
export const mapRowsToItems = (rows: any[]): Item[] => {
  return rows.map(mapRowToItem);
};