import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Header } from './header'

const meta: Meta<typeof Header> = {
	title: 'Components/Header',
	component: Header,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Main navigation header component with logo and shopping bag.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		quantity: { control: { type: 'number', min: 0, step: 1 } },
		onBagClick: { action: 'bag clicked' },
	},
	args: {
		quantity: 0,
		onBagClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof Header>

export const EmptyBag: Story = {
	args: {
		quantity: 0,
	},
}

export const WithItems: Story = {
	args: {
		quantity: 3,
	},
}

export const ManyItems: Story = {
	args: {
		quantity: 99,
	},
}
