'use client'

import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { fetchProducts } from '@/lib/api_service'
import type { ApiResponseProductGetAll } from '@demo-shop/repos'

interface ProductContextType {
	products: ApiResponseProductGetAll
	isLoading: boolean
	error: string | null
}

// Default context values
const defaultContextValue: ProductContextType = {
	products: [],
	isLoading: true,
	error: null,
}

const ProductContext = createContext<ProductContextType>(defaultContextValue)

export const useProducts = () => useContext(ProductContext)

export const ProductProvider: React.FC<{
	children: React.ReactNode
	initialProducts?: ApiResponseProductGetAll
}> = ({ children, initialProducts = [] }) => {
	// Ensure no duplicate product IDs in initialProducts
	const uniqueInitialProducts = removeDuplicateProductIds(initialProducts)

	const [products, setProducts] = useState<ApiResponseProductGetAll>(
		uniqueInitialProducts,
	)
	const [isLoading, setIsLoading] = useState<boolean>(
		uniqueInitialProducts.length === 0,
	)
	const [error, setError] = useState<string | null>(null)

	// Helper function to remove duplicate product IDs
	function removeDuplicateProductIds(
		productsList: ApiResponseProductGetAll,
	): ApiResponseProductGetAll {
		const uniqueProducts = new Map()

		for (const product of productsList) {
			if (!uniqueProducts.has(product.id)) {
				uniqueProducts.set(product.id, product)
			}
		}

		return Array.from(uniqueProducts.values())
	}

	// Fetch products if not provided initially
	useEffect(() => {
		const loadProducts = async () => {
			if (uniqueInitialProducts.length === 0) {
				try {
					setIsLoading(true)
					const productsData = await fetchProducts()
					const uniqueProductsData = removeDuplicateProductIds(productsData)
					setProducts(uniqueProductsData)
					setError(null)
				} catch (err) {
					setError('Failed to load products. Please try again later.')
					console.error('Error fetching products:', err)
				} finally {
					setIsLoading(false)
				}
			}
		}

		loadProducts()
	}, [uniqueInitialProducts])

	return (
		<ProductContext.Provider
			value={{
				products,
				isLoading,
				error,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}
