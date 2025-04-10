import type {
	ApiResponseProductGetAll,
	ApiResponseProductGetById,
	UsecaseProductsGetOne,
} from '@demo-shop/repos'
import { productCacheOptions, productsCacheOptions } from './cache_config'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Utility function for making API requests
async function fetchApi<T>(
	endpoint: string,
	options: RequestInit = {},
	cacheOptions = {},
): Promise<T> {
	const url = `${API_URL}${endpoint}`

	const response = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options.headers,
		},
		...cacheOptions,
	})

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`)
	}

	return response.json() as Promise<T>
}

export async function fetchProducts(
	searchQuery?: string,
	limit = 20,
	offset = 0,
): Promise<ApiResponseProductGetAll> {
	const queryParams = new URLSearchParams()

	if (searchQuery) {
		queryParams.append('search', searchQuery)
	}

	queryParams.append('limit', limit.toString())
	queryParams.append('offset', offset.toString())

	const queryString = queryParams.toString()
	const endpoint = queryString ? `/products?${queryString}` : '/products'

	return fetchApi<ApiResponseProductGetAll>(endpoint, {}, productsCacheOptions)
}

export async function fetchProductById(
	id: UsecaseProductsGetOne,
): Promise<ApiResponseProductGetById | null> {
	try {
		return await fetchApi<ApiResponseProductGetById>(
			`/products/${id}`,
			{},
			productCacheOptions(id),
		)
	} catch (error) {
		console.error('Error fetching product:', error)
		return null
	}
}
