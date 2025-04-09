import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SmartphoneCard } from './smartphone_card'

const meta: Meta<typeof SmartphoneCard> = {
	title: 'Components/SmartphoneCard',
	component: SmartphoneCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		state: { control: 'select', options: ['Default', 'Hover'] },
		name: { control: 'text' },
		brand: { control: 'text' },
		price: { control: 'text' },
		image: { control: false },
		onClick: { action: 'clicked' },
	},
	args: {
		state: 'Default',
		name: 'Galaxy S23',
		brand: 'Samsung',
		price: '$799',
		image: (
			<img
				src='http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.webp'
				alt='Samsung Galaxy S23'
				style={{ maxHeight: '220px', objectFit: 'contain' }}
			/>
		),
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof SmartphoneCard>

export const Default: Story = {
	args: {
		state: 'Default',
	},
}

export const Hover: Story = {
	args: {
		state: 'Hover',
	},
}
