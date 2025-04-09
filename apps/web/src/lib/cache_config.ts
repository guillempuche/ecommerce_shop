/**
 * Cache Tags for use with Next.js cache
 */
export const CACHE_TAGS = {
	PRODUCTS: 'products',
	PRODUCT: (id: string) => `product-${id}`,
}

/**
 * Default Next.js Cache configuration options
 * Used for fetch requests throughout the app
 */
export const defaultCacheOptions = {
	// Revalidate content at most every 5 minutes
	next: {
		revalidate: 300,
	},
}

/**
 * Products cache options with tags
 */
export const productsCacheOptions = {
	...defaultCacheOptions,
	next: {
		...defaultCacheOptions.next,
		tags: [CACHE_TAGS.PRODUCTS],
	},
}

/**
 * Individual product cache options with tags
 */
export const productCacheOptions = (id: string) => ({
	...defaultCacheOptions,
	next: {
		...defaultCacheOptions.next,
		tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.PRODUCT(id)],
	},
})
