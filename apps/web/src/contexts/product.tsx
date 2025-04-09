'use client'

import { fetchProducts } from '@/lib/api_service'
import type { ApiResponseProductGetAll } from '@demo-shop/repos'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface ProductContextType {
	products: ApiResponseProductGetAll
	filteredProducts: ApiResponseProductGetAll
	isLoading: boolean
	searchQuery: string
	setSearchQuery: (query: string) => void
	error: string | null
}

// Default context values
const defaultContextValue: ProductContextType = {
	products: [],
	filteredProducts: [],
	isLoading: true,
	searchQuery: '',
	setSearchQuery: () => {},
	error: null,
}

// Create context
const ProductContext = createContext<ProductContextType>(defaultContextValue)

// Custom hook to use the product context
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
	const [filteredProducts, setFilteredProducts] =
		useState<ApiResponseProductGetAll>(uniqueInitialProducts)
	const [isLoading, setIsLoading] = useState<boolean>(
		uniqueInitialProducts.length === 0,
	)
	const [searchQuery, setSearchQuery] = useState<string>('')
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
					setFilteredProducts(uniqueProductsData)
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

	// Filter products when search query changes
	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredProducts(products)
			return
		}

		const query = searchQuery.toLowerCase()
		const filtered = products.filter(
			product =>
				product.name.toLowerCase().includes(query) ||
				product.brand.toLowerCase().includes(query),
		)

		setFilteredProducts(filtered)
	}, [searchQuery, products])

	return (
		<ProductContext.Provider
			value={{
				products,
				filteredProducts,
				isLoading,
				searchQuery,
				setSearchQuery,
				error,
			}}
		>
			{children}
		</ProductContext.Provider>
	)
}
