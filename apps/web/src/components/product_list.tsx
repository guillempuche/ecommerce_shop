'use client'

import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import type { ApiResponseProductGetAll } from '@demo-shop/repos'
import { SmartphoneCard } from '@demo-shop/ui-components'

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin: 0 auto;
  max-width: fit-content;
  
  /* Negative margin technique for overlapping borders */
  & > a {
    margin-right: calc(var(--border-width-md) * -1);
    margin-bottom: calc(var(--border-width-md) * -1);
    z-index: 1;
  }
  
  /* Default for single column */
  & > a:last-child,
  & > a:nth-child(1n) {
    margin-right: 0;
  }
  
  /* Handle hover z-index */
  & > a:hover {
    z-index: 2;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    
    /* For 2 columns (md breakpoint) */
    & > a:nth-child(2n) {
      margin-right: 0;
    }
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    
    /* For 3 columns (lg breakpoint) */
    & > a:nth-child(2n) {
      margin-right: calc(var(--border-width-md) * -1);
    }
    
    & > a:nth-child(3n) {
      margin-right: 0;
    }
  }
`

const ProductLink = styled(Link)`
  display: block;
  width: 100%;
`

interface ProductListProps {
	products: ApiResponseProductGetAll
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
	const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

	return (
		<ProductGrid>
			{products.map(product => (
				<ProductLink
					href={`/product/${product.id}`}
					key={product.id}
					onMouseEnter={() => setHoveredProductId(product.id)}
					onMouseLeave={() => setHoveredProductId(null)}
				>
					<SmartphoneCard
						key={product.id}
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
				</ProductLink>
			))}
		</ProductGrid>
	)
}
