/**
 * Backend price utilities
 * All calculations should be done in cents (integers)
 */

/**
 * Convert cents to display format for frontend
 * @param cents - Price in cents
 * @returns Display format string (e.g., "25.00")
 */
export function centsToDisplay(cents: number): string {
    return (cents / 100).toFixed(2)
}

/**
 * Add display fields to an item
 * @param item - Item with price_cents
 * @returns Item with additional display fields
 */
export function addPriceDisplay<T extends { item_price_cents: number }>(
    item: T,
): T & { price_display: string } {
    return {
        ...item,
        price_display: centsToDisplay(item.item_price_cents),
    }
}