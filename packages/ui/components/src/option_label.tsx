'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

interface OptionLabelProps {
	children: ReactNode
	className?: string
}

const StyledOptionLabel = styled.span`
  color: var(--palette-black);
  text-transform: uppercase;
`

export const OptionLabel = ({ children, className }: OptionLabelProps) => {
	return <StyledOptionLabel className={className}>{children}</StyledOptionLabel>
}
