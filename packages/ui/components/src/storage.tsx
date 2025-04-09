'use client'

import styled, { css } from 'styled-components'

interface StorageProps {
	capacity: string
	selected?: boolean
	onClick?: () => void
	className?: string
}

interface StyledStorageProps {
	$selected?: boolean
}

const StyledStorage = styled.div<StyledStorageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
	height: 48px;
  padding: 0 24px;
  text-transform: uppercase;
  color: var(--palette-black);
  border: 1px solid var(--palette-lightgray);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props =>
		props.$selected &&
		css`
      border-color: var(--palette-black);
      background-color: var(--color-background-secondary);
    `}
  
  &:hover {
    border-color: var(--color-highlight-hover);
  }
`

export const Storage = ({
	capacity,
	selected = false,
	onClick,
	className,
}: StorageProps) => {
	return (
		<StyledStorage $selected={selected} onClick={onClick} className={className}>
			{capacity}
		</StyledStorage>
	)
}
