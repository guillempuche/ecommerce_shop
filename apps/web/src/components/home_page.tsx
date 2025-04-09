'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import { LayoutPage } from '@/components/layout_page'
import { useCart } from '@/contexts/cart'
import { ProductProvider, useProducts } from '@/contexts/product'
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
	const { filteredProducts, searchQuery, setSearchQuery } = useProducts()
	const { totalItems } = useCart()
	const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

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
					{filteredProducts.length}{' '}
					{filteredProducts.length === 1 ? 'product' : 'products'}
				</p>
			</ProductsInfo>

			{filteredProducts.length > 0 ? (
				<ProductsGrid>
					{filteredProducts.map(product => (
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

interface HomePageClientProps {
	products: ApiResponseProductGetAll
}

export function HomePageClient({ products }: HomePageClientProps) {
	return (
		<ProductProvider initialProducts={products}>
			<HomePageContent />
		</ProductProvider>
	)
}
