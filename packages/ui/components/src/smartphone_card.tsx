import type { ReactNode } from 'react'
import styled, { css } from 'styled-components'

type State = 'Default' | 'Hover'

interface SmartphoneCardProps {
	state?: State
	name: string
	brand: string
	price: string
	image: ReactNode
	onClick?: () => void
	className?: string
}

interface StyledSmartphoneCardProps {
	$state?: State
}

const StyledSmartphoneCard = styled.div<StyledSmartphoneCardProps>`
  position: relative;
  width: 100%;
  // max-width: 344px;
	max-width: none;
  height: auto;
  max-height: 344px;
  padding: 16px;
  border: var(--border-width-md) solid var(--palette-black);
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  
  /* Static background */
  background-color: var(--color-background-primary);
    
  /* Bottom to top hover animation using pseudo-element */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--color-highlight-default);
    transition: height 0.3s ease-in-out;
    z-index: 0;
  }
  
  ${props =>
		props.$state === 'Hover' &&
		css`
      &::after {
        height: 100%;
      }
    `}

  /* Allow aspect ratio to be maintained */
  aspect-ratio: 1 / 1;
`

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  min-height: 0; /* Allows image container to shrink */

  /* Ensure the image fits within the container */
  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  width: 100%;
`

const BrandName = styled.div`
  display: flex;
  flex-direction: column;
`

const Brand = styled.span<{ $state?: State }>`
  text-transform: uppercase;
  opacity: 0.7;
  color: ${props =>
		props.$state === 'Hover' ? 'var(--palette-white)' : 'var(--palette-gray)'};
  transition: color 0.2s ease-in-out;
`

const Name = styled.span<{ $state?: State }>`
  font-size: var(--font-size-md);
  text-transform: uppercase;
  
  color: ${props =>
		props.$state === 'Hover' ? 'var(--palette-white)' : 'var(--palette-black)'};
  transition: color 0.2s ease-in-out;
`

const Price = styled.span<{ $state?: State }>`
  font-size: var(--font-size-md);
  text-transform: uppercase;
  margin-top: auto;
  
  color: ${props =>
		props.$state === 'Hover'
			? 'var(--palette-white)'
			: 'var(--color-content-primary)'};
  transition: color 0.2s ease-in-out;
`

export const SmartphoneCard = ({
	state = 'Default',
	name,
	brand,
	price,
	image,
	onClick,
	className,
}: SmartphoneCardProps) => {
	return (
		<StyledSmartphoneCard
			$state={state}
			onClick={onClick}
			className={className}
		>
			<ImageWrapper>{image}</ImageWrapper>
			<Info>
				<BrandName>
					<Brand $state={state}>{brand}</Brand>
					<Name $state={state}>{name}</Name>
				</BrandName>
				<Price $state={state}>{price}</Price>
			</Info>
		</StyledSmartphoneCard>
	)
}
