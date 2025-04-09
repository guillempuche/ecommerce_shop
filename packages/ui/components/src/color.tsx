'use client'

import styled, { css } from 'styled-components'

interface ColorProps {
	hexCode: string
	selected?: boolean
	onClick?: () => void
	className?: string
}

interface StyledColorProps {
	$hexCode: string
	$selected?: boolean
}

const StyledColor = styled.div<StyledColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: var(--border-width-lg) solid ${props => (props.$selected ? 'var(--palette-black)' : 'var(--palette-lightgray)')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props =>
		props.$selected &&
		css`
      border-color: var(--palette-black);
      
      &:hover {
        border-color: var(--palette-black);
      }
    `}
  
  ${props =>
		!props.$selected &&
		css`
      &:hover {
        border-color: var(--palette-gray);
      }
    `}
`

const ColorSwatch = styled.div<{ $hexCode: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.$hexCode};
`

export const Color = ({
	hexCode,
	selected = false,
	onClick,
	className,
}: ColorProps) => {
	return (
		<StyledColor
			$hexCode={hexCode}
			$selected={selected}
			onClick={onClick}
			className={className}
		>
			<ColorSwatch $hexCode={hexCode} />
		</StyledColor>
	)
}
