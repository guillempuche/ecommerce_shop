'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { useCart } from '@/contexts/cart'
import { Button, CartItem } from '@demo-shop/ui-components'
import { LayoutPage } from './layout_page'

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  /* Fill the entire MainContent for proper positioning */
  flex: 1;
  /* Allow content to scroll when needed */
  min-height: 0;
  /* Add padding to prevent content from being hidden behind fixed bottom section */
  padding-bottom: 120px;
`

const CartLabel = styled.h1`
  font-size: var(--font-size-xl);
  text-transform: uppercase;
  margin-bottom: var(--space-fluid-lg);
`

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-fluid-md); /* Increased gap between cart items */
  /* Allow scrolling when content overflows */
  overflow-y: auto;
  /* Take remaining space but allow bottom section to stay visible */
  flex: 1;
  /* Add some bottom margin to separate from bottom section */
  margin-bottom: var(--space-fluid-md);
`

const BottomSection = styled.div`
  padding: 24px;
  background-color: var(--color-background-primary);
  /* Fixed to the bottom of the viewport */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* Add shadow for visual distinction */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  /* Ensure it stays on top of other content */
  z-index: 10;
  
  /* For large screens: single row layout */
  @media (min-width: 769px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  /* For small screens: column layout */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: var(--space-fluid-md);
  }
`

const LargeScreenContainer = styled.div`
  /* Only visible on large screens */
  @media (max-width: 768px) {
    display: none;
  }
  
  @media (min-width: 769px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

const SmallScreenContainer = styled.div`
  /* Only visible on small screens */
  @media (min-width: 769px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-fluid-md);
  }
`

const TotalAndPayContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-fluid-md);
`

const TotalContainer = styled.div`
  display: flex;
  gap: var(--space-fluid-md);
  align-items: center;
  text-wrap: nowrap;
  
  /* For small screens */
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    justify-content: space-between;
  }
`

const ButtonsRow = styled.div`
  display: flex;
  gap: var(--space-fluid-sm);
  width: 100%;
`

const TotalLabel = styled.span`
  font-size: var(--font-size-sm);
  text-transform: uppercase;
`

const TotalPrice = styled.span`
  font-size: var(--font-size-sm);
  text-transform: uppercase;
`

const ContinueShoppingButton = styled(Button)`
  @media (max-width: 768px) {
    flex: 1;
  }
`

const PayButton = styled(Button)`
  min-width: 260px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`

export function CheckoutPageClient() {
	const { items, totalItems, totalPrice, removeItem, clearCart } = useCart()
	const router = useRouter()

	const handlePayment = () => {
		clearCart()
		router.push('/')
	}

	const formatPrice = (price: number) => {
		return `${price.toFixed(2)} EUR`
	}

	return (
		<LayoutPage cartItemCount={totalItems}>
			<PageContent>
				<CartLabel>Cart ({totalItems})</CartLabel>

				{items.length > 0 ? (
					<>
						<CartItemsContainer>
							{items.map(item => (
								<CartItem
									key={item.id}
									brand={item.brand.toUpperCase()}
									name={item.name.toUpperCase()}
									properties={[
										item.storage?.capacity || '',
										item.color?.name || '',
									].filter(Boolean)}
									price={formatPrice(item.price)}
									image={
										<Image
											src={item.imageUrl}
											alt={`${item.brand} ${item.name}`}
											width={220}
											height={220}
											style={{ objectFit: 'contain' }}
										/>
									}
									onDeleteClick={() => removeItem(item.id)}
								/>
							))}
						</CartItemsContainer>

						<BottomSection>
							{/* Large screens layout: Single row with continue button on left, total+price in middle, pay button on right */}
							<LargeScreenContainer>
								<ContinueShoppingButton
									extraHeight
									onClick={() => router.push('/')}
								>
									Continue shopping
								</ContinueShoppingButton>

								<TotalAndPayContainer>
									<TotalContainer>
										<TotalLabel>Total</TotalLabel>
										<TotalPrice>{formatPrice(totalPrice)}</TotalPrice>
									</TotalContainer>

									<PayButton
										feedback='Primary'
										extraHeight
										onClick={handlePayment}
									>
										Pay
									</PayButton>
								</TotalAndPayContainer>
							</LargeScreenContainer>

							{/* Small screens layout: Total+price at top, buttons in a row below */}
							<SmallScreenContainer>
								<TotalContainer>
									<TotalLabel>Total</TotalLabel>
									<TotalPrice>{formatPrice(totalPrice)}</TotalPrice>
								</TotalContainer>

								<ButtonsRow>
									<ContinueShoppingButton
										extraHeight
										onClick={() => router.push('/')}
									>
										Continue shopping
									</ContinueShoppingButton>

									<PayButton
										feedback='Primary'
										extraHeight
										onClick={handlePayment}
									>
										Pay
									</PayButton>
								</ButtonsRow>
							</SmallScreenContainer>
						</BottomSection>
					</>
				) : (
					<BottomSection>
						<LargeScreenContainer>
							<ContinueShoppingButton onClick={() => router.push('/')}>
								Continue shopping
							</ContinueShoppingButton>
						</LargeScreenContainer>

						<SmallScreenContainer>
							<ButtonsRow>
								<ContinueShoppingButton onClick={() => router.push('/')}>
									Continue shopping
								</ContinueShoppingButton>
							</ButtonsRow>
						</SmallScreenContainer>
					</BottomSection>
				)}
			</PageContent>
		</LayoutPage>
	)
}
