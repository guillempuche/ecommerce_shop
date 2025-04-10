'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LayoutPage } from '@/components/layout_page'
import { useCart } from '@/contexts/cart'
import { fetchProductById } from '@/lib/api_service'
import type {
	ProductColorOption,
	ProductStorageOption,
} from '@demo-shop/domain'
import type { ApiResponseProductGetById } from '@demo-shop/repos'
import {
	Button,
	ColorOptions,
	SmartphoneCard,
	SpecificationRow,
	Storage,
} from '@demo-shop/ui-components'

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-fluid-md);
  color: var(--color-content-primary);
  
  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 834px) {
    display: none;
  }
`

const ChevronIcon = styled.svg`
  width: 20px;
  height: 20px;
	margin-right: 4px;
`

const BackLabel = styled.span`
  text-transform: uppercase;
`

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: var(--space-fluid-md);
  
  /* Product image container */
  & > *:first-child {
    flex: 1 0 45%;
    min-width: 280px;
    max-width: 650px;
    display: flex;
    justify-content: center;
  }
  
  /* Product info container */
  & > *:last-child {
    flex: 1 0 45%; /* Grow, don't shrink, and take up 45% by default */
    min-width: 280px;
    max-width: 500px;
    align-self: flex-start; /* Align at the top instead of stretching */
  }
`

const ProductImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  position: relative; /* Add position relative */
  
  img {
    max-width: 100%;
    height: auto;
    max-height: 600px;
    object-fit: contain;
    
    @media (max-width: 768px) {
      max-height: 270px;
    }
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-fluid-md);
  position: relative; /* Add position relative */
  width: 100%;
  
  /* Ensures all content is left-aligned */
  text-align: left;
  
  /* Apply left-alignment to all child elements */
  & > * {
    align-self: flex-start;
    width: 100%;
  }
`

const ProductName = styled.h1`
  font-size: var(--font-size-lg);
  text-transform: uppercase;
  margin-top: var(--space-fluid-lg);
  margin-bottom: var(--space-fluid-xs);

`

const ProductPrice = styled.p`
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-fluid-lg);
`

const ProductOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-fluid-lg);
  margin-bottom: var(--space-fluid-md);
`

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-fluid-xs);
`

const OptionTitle = styled.h3`
  text-transform: uppercase;
  font-size: var(--font-size-xs);
  margin-bottom: var(--space-fluid-xs);
`

const StorageOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ActionButton = styled.div`
  margin-top: var(--space-fluid-2xl);
`

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  text-transform: uppercase;
  margin: var(--space-fluid-lg) 0 var(--space-fluid-md);
`

const SpecificationsContainer = styled.div`
	max-width: 1200px;
	width: 100%;
  margin: var(--space-fluid-2xl) auto 0;

	& > div:first-of-type {
    border-top: var(--border-width-md) solid var(--palette-black);
  }
`

const SimilarItemsContainer = styled.div`
	max-width: 1200px;
  width: 100%;
  margin: var(--space-fluid-xl) auto 0;
  position: relative;
`

const SimilarItemsScroll = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: var(--space-fluid-sm);
	width: 100%;
	// Prevent scroll propagation
  max-width: 100%;
	overflow-x: auto;
	position: absolute;
  left: 0;

	// Allow truly horizontal scrolling that extends beyond the container
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-disabled);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-highlight-default);
  }
`

const SimilarItemCard = styled.div`
  flex: 0 0 auto;
  width: 280px;
  cursor: pointer;
`

interface ProductDetailsPageProps {
	productId: string
}

export function ProductDetailsPage({ productId }: ProductDetailsPageProps) {
	const { addItem, totalItems } = useCart()
	const [product, setProduct] = useState<ApiResponseProductGetById | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [selectedColor, setSelectedColor] = useState<
		ProductColorOption | undefined
	>(undefined)
	const [selectedStorage, setSelectedStorage] = useState<
		ProductStorageOption | undefined
	>(undefined)
	const [hoveredProductId, setHoveredProductId] = useState<string | null>(null)

	useEffect(() => {
		const loadProduct = async () => {
			setIsLoading(true)
			const productData = await fetchProductById(productId)
			setProduct(productData)

			// Only update selectedColor and selectedStorage if product is loaded successfully
			if (productData) {
				setSelectedColor(
					productData.colorOptions.length > 0
						? productData.colorOptions[0]
						: undefined,
				)
				setSelectedStorage(
					productData.storageOptions.length > 0
						? productData.storageOptions[0]
						: undefined,
				)
			}

			setIsLoading(false)
		}

		loadProduct()
	}, [productId])

	// Calculate product price based on selected storage
	const totalPrice =
		product && selectedStorage
			? product.basePrice + selectedStorage.price
			: product?.basePrice || 0

	const handleAddToCart = () => {
		if (!product) return

		// Ensure imageUrl is always a string
		const imageUrl = selectedColor
			? selectedColor.imageUrl.toString()
			: product.colorOptions[0]?.imageUrl?.toString() || ''

		// Create the item with proper typing
		const item = {
			productId: product.id,
			brand: product.brand,
			name: product.name,
			price: totalPrice,
			imageUrl,
			// Only include color and storage if they are defined
			...(selectedColor && { color: selectedColor }),
			...(selectedStorage && { storage: selectedStorage }),
		}

		addItem(item)
	}

	// If loading, show a loading state
	if (isLoading) {
		return (
			<LayoutPage cartItemCount={totalItems}>
				<BackLink href='/'>
					<ChevronIcon
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<polyline points='15 18 9 12 15 6' />
					</ChevronIcon>
					<BackLabel>Back</BackLabel>
				</BackLink>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						flex: '1 1 auto',
						gap: 'var(--space-fluid-xl)',
						padding: 'var(--space-fluid-2xl) 0',
						minHeight: '50vh',
					}}
				>
					<h2>Loading product...</h2>
				</div>
			</LayoutPage>
		)
	}

	// If the product is not found, show a message
	if (!product) {
		return (
			<LayoutPage cartItemCount={totalItems}>
				<BackLink href='/'>
					<ChevronIcon
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<polyline points='15 18 9 12 15 6' />
					</ChevronIcon>
					<BackLabel>Back</BackLabel>
				</BackLink>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						flex: '1 1 auto',
						gap: 'var(--space-fluid-xl)',
						padding: 'var(--space-fluid-2xl) 0',
						minHeight: '50vh',
					}}
				>
					<h2>Product not found</h2>
					<p>Sorry, we couldn't find the product you're looking for.</p>
					<Link href='/'>
						<Button>Browse Products</Button>
					</Link>
				</div>
			</LayoutPage>
		)
	}

	return (
		<LayoutPage cartItemCount={totalItems}>
			<BackLink href='/'>
				<ChevronIcon
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<polyline points='15 18 9 12 15 6' />
				</ChevronIcon>
				<BackLabel>Back</BackLabel>
			</BackLink>

			<ProductContainer>
				<ProductImageContainer>
					{selectedColor ? (
						<Image
							src={selectedColor.imageUrl.toString()}
							alt={`${product.brand} ${product.name} in ${selectedColor.name}`}
							width={500}
							height={500}
							priority
							style={{
								objectFit: 'contain',
								width: 'auto',
								height: 'auto',
								maxHeight: '600px',
							}}
						/>
					) : (
						<Image
							src={product.colorOptions[0]?.imageUrl.toString() || ''}
							alt={`${product.brand} ${product.name}`}
							width={500}
							height={500}
							priority
							style={{
								objectFit: 'contain',
								width: 'auto',
								height: 'auto',
								maxHeight: '600px',
							}}
						/>
					)}
				</ProductImageContainer>

				<ProductInfo>
					<div>
						<ProductName>{product.name}</ProductName>
						<ProductPrice>From {product.basePrice} EUR</ProductPrice>
					</div>

					<ProductOptions>
						{/* Storage options */}
						<OptionContainer>
							<OptionTitle>Storage ¿How much space do you need?</OptionTitle>
							<StorageOptions>
								{product.storageOptions.map(option => (
									<Storage
										key={option.capacity}
										capacity={option.capacity}
										selected={selectedStorage?.capacity === option.capacity}
										onClick={() => setSelectedStorage(option)}
									/>
								))}
							</StorageOptions>
						</OptionContainer>

						{/* Color options */}
						<OptionContainer>
							<OptionTitle>Color. Pick your favorite.</OptionTitle>
							<ColorOptions
								colorOptions={[...product.colorOptions]}
								onColorSelect={colorOption => setSelectedColor(colorOption)}
								selectedColor={selectedColor || null}
							/>
						</OptionContainer>
					</ProductOptions>

					<ActionButton>
						<Button feedback='Primary' extraHeight onClick={handleAddToCart}>
							Añadir
						</Button>
					</ActionButton>
				</ProductInfo>
			</ProductContainer>

			{/* Product specifications */}
			<SpecificationsContainer>
				<SectionTitle>Specifications</SectionTitle>

				<SpecificationRow label='Screen' data={product.specs.screen} />
				<SpecificationRow label='Resolution' data={product.specs.resolution} />
				<SpecificationRow label='Processor' data={product.specs.processor} />
				<SpecificationRow label='Main Camera' data={product.specs.mainCamera} />
				<SpecificationRow
					label='Selfie Camera'
					data={product.specs.selfieCamera}
				/>
				<SpecificationRow label='Battery' data={product.specs.battery} />
				<SpecificationRow label='OS' data={product.specs.os} />
				<SpecificationRow
					label='Refresh Rate'
					data={product.specs.screenRefreshRate}
				/>
			</SpecificationsContainer>

			{/* Similar items */}
			{product.similarProducts && product.similarProducts.length > 0 && (
				<SimilarItemsContainer>
					<SectionTitle>Similar Items</SectionTitle>

					<SimilarItemsScroll>
						{product.similarProducts.map(similarProduct => (
							<SimilarItemCard
								key={similarProduct.id}
								onMouseEnter={() => setHoveredProductId(similarProduct.id)}
								onMouseLeave={() => setHoveredProductId(null)}
							>
								<Link href={`/product/${similarProduct.id}`}>
									<SmartphoneCard
										state={
											hoveredProductId === similarProduct.id
												? 'Hover'
												: 'Default'
										}
										brand={similarProduct.brand.toUpperCase()}
										name={similarProduct.name.toUpperCase()}
										price={`${similarProduct.basePrice} EUR`}
										image={
											<Image
												src={similarProduct.imageUrl.toString()}
												alt={similarProduct.name}
												width={200}
												height={200}
											/>
										}
										onClick={() => {}}
									/>
								</Link>
							</SimilarItemCard>
						))}
					</SimilarItemsScroll>
				</SimilarItemsContainer>
			)}
		</LayoutPage>
	)
}
