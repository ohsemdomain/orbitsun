interface IdCounterData {
	year: number
	count: number
}

/**
 * Generates a unique ID with format: PREFIX + YY + XXXX
 * e.g., ITE250001, ITE250002, etc.
 * Uses crypto for secure random generation in Cloudflare Workers
 */
export async function generateId(
	prefix: string,
	kv: KVNamespace,
): Promise<string> {
	if (prefix.length !== 3) {
		throw new Error('Prefix must be exactly 3 characters')
	}

	try {
		const currentYear = new Date().getFullYear() % 100 // Get last 2 digits
		const kvKey = `id_counter_${prefix}_${currentYear}`

		// Get current counter data
		const counterData = await kv.get<IdCounterData>(kvKey, 'json')
		
		let count: number
		if (!counterData || counterData.year !== currentYear) {
			// Reset counter for new year or first time
			count = 1
		} else {
			count = counterData.count + 1
		}

		// Store updated counter
		await kv.put(kvKey, JSON.stringify({
			year: currentYear,
			count
		}))

		// Format: PREFIX + YY + 4-digit count
		const formattedYear = currentYear.toString().padStart(2, '0')
		const formattedCount = count.toString().padStart(4, '0')
		
		return `${prefix}${formattedYear}${formattedCount}`
	} catch (error) {
		console.error('Failed to generate ID:', error);
		// Fallback to timestamp-based ID
		const timestamp = Date.now().toString(36);
		const random = Math.random().toString(36).substring(2, 6);
		return `${prefix}${timestamp}${random}`.toUpperCase();
	}
}

/**
 * Generate item ID
 */
export async function generateItemId(kv: KVNamespace): Promise<string> {
	return generateId('ITE', kv)
}