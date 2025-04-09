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
	justify-content: space-between;
`

const CartLabel = styled.h1`
	font-size: var(--font-size-xl);
  text-transform: uppercase;
  margin-bottom: var(--space-fluid-lg);
`

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-m);
  margin-bottom: var(--space-fluid-2xl);
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`
const PaymentContainer = styled.div`
  display: flex;
  gap: 24px;
`
const TotalContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
	text-wrap: nowrap;
`

const TotalLabel = styled.span`
	font-size: var(--font-size-sm);
  text-transform: uppercase;
`

const TotalPrice = styled.span`
	font-size: var(--font-size-sm);
  text-transform: uppercase;
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
							<Button extraHeight onClick={() => router.push('/')}>
								Continue shopping
							</Button>

							<PaymentContainer>
								<TotalContainer>
									<TotalLabel>Total</TotalLabel>
									<TotalPrice>{formatPrice(totalPrice)}</TotalPrice>
								</TotalContainer>

								<Button feedback='Primary' extraHeight onClick={handlePayment}>
									Pay
								</Button>
							</PaymentContainer>
						</BottomSection>
					</>
				) : (
					<BottomSection>
						<Button onClick={() => router.push('/')}>Continue shopping</Button>
					</BottomSection>
				)}
			</PageContent>
		</LayoutPage>
	)
}
