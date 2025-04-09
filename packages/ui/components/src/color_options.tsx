'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'

import type { ProductColorOption } from '@demo-shop/domain'
import { Color } from './color'

interface ColorOptionsProps {
	colorOptions: ProductColorOption[]
	onColorSelect?: (colorOption: ProductColorOption) => void
	defaultSelected?: string
	selectedColor?: ProductColorOption | null
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Colors = styled.div`
  display: flex;
  gap: 16px;
`

const Label = styled.span`
  color: var(--color-content-primary);
  font-size: var(--font-size-xs);
`

export const ColorOptions = ({
	colorOptions,
	onColorSelect,
	defaultSelected,
	selectedColor,
}: ColorOptionsProps) => {
	const [selectedColorName, setSelectedColorName] = useState<
		string | undefined
	>(defaultSelected)

	useEffect(() => {
		if (defaultSelected !== undefined) {
			setSelectedColorName(defaultSelected)
		}
	}, [defaultSelected])

	const handleClick = (colorOption: ProductColorOption) => {
		setSelectedColorName(colorOption.name)
		onColorSelect?.(colorOption)
	}

	// Determine what to display in the label:
	// If user selected a color, show that name
	// Or if a selectedColor is provided, show its name
	const displayLabel = selectedColor?.name || selectedColorName || ''

	return (
		<Container>
			<Colors>
				{colorOptions.map(colorOption => (
					<Color
						key={colorOption.name}
						hexCode={colorOption.hexCode}
						selected={
							selectedColorName === colorOption.name ||
							selectedColor?.name === colorOption.name
						}
						onClick={() => handleClick(colorOption)}
					/>
				))}
			</Colors>
			<Label>{displayLabel}</Label>
		</Container>
	)
}
