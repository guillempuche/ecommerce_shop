import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { CartItem } from './cart_item'

const meta: Meta<typeof CartItem> = {
	title: 'Components/CartItem',
	component: CartItem,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Cart item component for displaying products in the shopping cart.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		brand: { control: 'text' },
		name: { control: 'text' },
		properties: { control: 'object' },
		price: { control: 'text' },
		image: { control: 'object' },
		onDeleteClick: { action: 'deleted' },
	},
	args: {
		brand: 'Apple',
		name: 'iPhone 15 Pro',
		properties: ['128 GB', 'Blue Titanium'],
		price: '1099 EUR',
		image: (
			<img
				src='http://prueba-tecnica-api-tienda-moviles.onrender.com/images/APL-IP13-128-medianoche.webp'
				alt='iPhone 15 Pro'
				style={{ maxHeight: '220px', objectFit: 'contain' }}
			/>
		),
		onDeleteClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof CartItem>

export const Default: Story = {
	args: {},
}

export const SamsungDevice: Story = {
	args: {
		brand: 'Samsung',
		name: 'Galaxy S23 Ultra',
		properties: ['256 GB', 'Phantom Black'],
		price: '1199 EUR',
		image: (
			<img
				src='http://prueba-tecnica-api-tienda-moviles.onrender.com/images/SAM-S23-256-grafito.webp'
				alt='Samsung Galaxy S23 Ultra'
				style={{ maxHeight: '220px', objectFit: 'contain' }}
			/>
		),
	},
}

export const XiaomiDevice: Story = {
	args: {
		brand: 'Xiaomi',
		name: 'Mi 12 Pro',
		properties: ['512 GB', 'Cosmic Gray'],
		price: '899 EUR',
		image: (
			<img
				src='http://prueba-tecnica-api-tienda-moviles.onrender.com/images/XIA-MI12-256-azul.webp'
				alt='Xiaomi Mi 12 Pro'
				style={{ maxHeight: '220px', objectFit: 'contain' }}
			/>
		),
	},
}
