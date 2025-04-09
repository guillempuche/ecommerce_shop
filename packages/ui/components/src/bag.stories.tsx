import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Bag } from './bag'

const meta: Meta<typeof Bag> = {
	title: 'Components/Bag',
	component: Bag,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		quantity: { control: { type: 'number', min: 0, step: 1 } },
		onClick: { action: 'clicked' },
	},
	args: {
		quantity: 0,
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof Bag>

export const Empty: Story = {
	args: {
		quantity: 0,
	},
}

export const FewItems: Story = {
	args: {
		quantity: 3,
	},
}

export const ManyItems: Story = {
	args: {
		quantity: 10000,
	},
}
