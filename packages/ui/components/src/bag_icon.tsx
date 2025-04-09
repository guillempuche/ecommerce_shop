'use client'

import styled from 'styled-components'

interface BagIconProps {
	active?: boolean
	className?: string
}

const StyledBagIcon = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  cursor: pointer;
  
  svg {
    width: 100%;
    height: 100%;
  }
  
  path {
    fill: ${props => (props.$active ? 'var(--palette-black)' : 'none')};
    stroke: var(--palette-black);
    stroke-width: 1.5px;
  }
`

export const BagIcon = ({ active = false, className }: BagIconProps) => {
	return (
		<StyledBagIcon
			$active={active}
			className={className}
			aria-label='Shopping bag'
		>
			<svg viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
				<title>Bag</title>
				<path
					d='M4.5 5.25V3.75C4.5 2.5074 5.5074 1.5 6.75 1.5H11.25C12.4926 1.5 13.5 2.5074 13.5 3.75V5.25M4.5 5.25H3C2.17157 5.25 1.5 5.92157 1.5 6.75V15C1.5 15.8284 2.17157 16.5 3 16.5H15C15.8284 16.5 16.5 15.8284 16.5 15V6.75C16.5 5.92157 15.8284 5.25 15 5.25H13.5M4.5 5.25H13.5M9 8.25V13.5M6.75 10.5H11.25'
					strokeLinecap='round'
					strokeLinejoin='round'
				/>
			</svg>
		</StyledBagIcon>
	)
}
