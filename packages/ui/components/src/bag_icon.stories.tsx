import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { BagIcon } from './bag_icon'

const meta: Meta<typeof BagIcon> = {
	title: 'Components/BagIcon',
	component: BagIcon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		active: { control: 'boolean' },
		onClick: { action: 'clicked' },
	},
	args: {
		active: false,
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof BagIcon>

export const Default: Story = {
	args: {
		active: false,
	},
}

export const Active: Story = {
	args: {
		active: true,
	},
}
