import styled from 'styled-components'

import { BagIcon } from './bag_icon'

interface BagProps {
	quantity: number
	className?: string
	onClick?: (() => void) | undefined
}

const StyledBag = styled.button`
  display: inline-flex;
	background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  cursor: pointer;
`

export const Bag = ({ quantity, className, onClick }: BagProps) => {
	const itemText = quantity === 1 ? 'item' : 'items'
	const ariaLabel = `View shopping cart with ${quantity} ${itemText}`

	return (
		<StyledBag
			className={className}
			aria-label={ariaLabel}
			type='button'
			onClick={onClick}
		>
			<BagIcon active={quantity > 0} />
			<span>{quantity}</span>
		</StyledBag>
	)
}
