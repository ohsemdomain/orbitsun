/**
 * Convert price string (RM) to cents for database storage
 * @example priceStringToCents('25.99') => 2599
 */
export const priceStringToCents = (price: string): number => {
  const numPrice = parseFloat(price) || 0;
  return Math.round(numPrice * 100);
};

/**
 * Convert cents to display string
 * @example priceCentsToString(2599) => '25.99'
 */
export const priceCentsToString = (cents: number): string => {
  return (cents / 100).toFixed(2);
};

/**
 * Format cents as RM currency display
 * @example formatPriceRM(2599) => 'RM 25.99'
 */
export const formatPriceRM = (cents: number): string => {
  return `RM ${priceCentsToString(cents)}`;
};

/**
 * Add RM price display to any object with price in cents
 */
export const addPriceDisplay = <T extends { [key: string]: any }>(
  item: T,
  priceField = 'price_cents'
): T & { price_display: string } => {
  const cents = item[priceField];
  return {
    ...item,
    price_display: formatPriceRM(cents),
  };
};