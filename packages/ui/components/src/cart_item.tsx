'use client'

import { useState } from 'react'
import styled from 'styled-components'

interface CartItemProps {
	brand: string
	name: string
	properties: string[]
	price: string
	image: React.ReactNode
	onDeleteClick?: () => void
	className?: string
}

interface StyledCartItemProps {
	$isHovered: boolean
}

const StyledCartItem = styled.div<StyledCartItemProps>`
  display: flex;
  width: 548px;
  background-color: var(--color-background-primary);
`

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 40px 0;
`

const InfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const BrandAndName = styled.div`
  display: flex;
  gap: 4px;
`

const Brand = styled.span<{ $isHovered: boolean }>`
  text-transform: uppercase;
`

const Name = styled.span<{ $isHovered: boolean }>`
  text-transform: uppercase;
`

const Properties = styled.span<{ $isHovered: boolean }>`
  text-transform: uppercase;
`

const Price = styled.span<{ $isHovered: boolean }>`
	margin-top: var(--space-fluid-md);
  text-transform: uppercase;
`

const DeleteButton = styled.button<{ $isHovered: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #DF0000;
  transition: all 200ms ease-out;
  align-self: flex-start;
  
  &:hover {
    color: rgba(223, 0, 0, 0.6);
  }
`

export const CartItem = ({
	brand,
	name,
	properties,
	price,
	image,
	onDeleteClick,
	className,
}: CartItemProps) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<StyledCartItem
			className={className}
			$isHovered={isHovered}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<ImageWrapper>{image}</ImageWrapper>
			<ContentWrapper>
				<InfoDetails>
					<BrandAndName>
						<Brand $isHovered={isHovered}>{brand}</Brand>
						<Name $isHovered={isHovered}>{name}</Name>
					</BrandAndName>
					<Properties $isHovered={isHovered}>
						{properties.join(' | ')}
					</Properties>
					<Price $isHovered={isHovered}>{price}</Price>
				</InfoDetails>
				<DeleteButton $isHovered={isHovered} onClick={onDeleteClick}>
					Eliminar
				</DeleteButton>
			</ContentWrapper>
		</StyledCartItem>
	)
}
