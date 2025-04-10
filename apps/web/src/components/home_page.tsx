'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LayoutPage } from '@/components/layout_page'
import { useCart } from '@/contexts/cart'
import { fetchProducts } from '@/lib/api_service'
import type { ApiResponseProductGetAll } from '@demo-shop/repos'
import { Search, SmartphoneCard } from '@demo-shop/ui-components'

const SearchContainer = styled.div`
  margin-bottom: var(--space-fluid-xs);
`

const ProductsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-fluid-md-xl);
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const NoResults = styled.div`
  text-align: center;
  padding: var(--space-xl) 0;
`

const CardWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`

const HomePageContent = () => {
	const [products, setProducts] = useState<ApiResponseProductGetAll>([])
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const { totalItems } = useCart()
	const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

	useEffect(() => {
		const loadProducts = async () => {
			setIsLoading(true)
			try {
				// Always limit to 20 products
				const productsData = await fetchProducts(searchQuery, 20, 0)
				setProducts(productsData)
			} catch (error) {
				console.error('Error fetching products:', error)
			} finally {
				setIsLoading(false)
			}
		}

		// Small delay to prevent too many API calls while typing
		const timer = setTimeout(() => {
			loadProducts()
		}, 300)

		return () => clearTimeout(timer)
	}, [searchQuery])

	return (
		<LayoutPage cartItemCount={totalItems}>
			<SearchContainer>
				<Search
					placeholder='Search smartphones...'
					initialValue={searchQuery}
					onChange={setSearchQuery}
					onClear={() => setSearchQuery('')}
				/>
			</SearchContainer>

			<ProductsInfo>
				<p>
					{products.length} {products.length === 1 ? 'product' : 'products'}
				</p>
			</ProductsInfo>

			{isLoading ? (
				<div>Loading...</div>
			) : products.length > 0 ? (
				<ProductsGrid>
					{products.map(product => (
						<CardWrapper
							key={product.id}
							onMouseEnter={() => setHoveredProductId(product.id)}
							onMouseLeave={() => setHoveredProductId(null)}
						>
							<Link href={`/product/${product.id}`}>
								<SmartphoneCard
									state={hoveredProductId === product.id ? 'Hover' : 'Default'}
									brand={product.brand.toUpperCase()}
									name={product.name.toUpperCase()}
									price={`${product.basePrice} EUR`}
									image={
										<Image
											src={product.imageUrl.toString()}
											alt={product.name}
											width={300}
											height={300}
											style={{ objectFit: 'contain' }}
											priority={true}
										/>
									}
								/>
							</Link>
						</CardWrapper>
					))}
				</ProductsGrid>
			) : (
				<NoResults>
					<p>No products found matching "{searchQuery}"</p>
				</NoResults>
			)}
		</LayoutPage>
	)
}

export function HomePageClient() {
	return <HomePageContent />
}
