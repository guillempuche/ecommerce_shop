'use server'

import { revalidateTag } from 'next/cache'

import { CACHE_TAGS } from './cache_config'

/**
 * Revalidate all products in the cache
 */
export async function revalidateProducts() {
	revalidateTag(CACHE_TAGS.PRODUCTS)
}

/**
 * Revalidate a specific product in the cache
 */
export async function revalidateProduct(id: string) {
	revalidateTag(CACHE_TAGS.PRODUCT(id))
}
