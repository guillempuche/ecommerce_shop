import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Color } from './color'

const meta: Meta<typeof Color> = {
	title: 'Components/Color',
	component: Color,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		hexCode: { control: 'color' },
		selected: { control: 'boolean' },
		onClick: { action: 'clicked' },
	},
	args: {
		hexCode: '#FF5733',
		selected: false,
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof Color>

export const Default: Story = {
	args: {
		hexCode: '#FF5733',
		selected: false,
	},
}

export const Selected: Story = {
	args: {
		hexCode: '#FF5733',
		selected: true,
	},
}

export const DarkColor: Story = {
	args: {
		hexCode: '#1A237E',
		selected: false,
	},
}

export const LightColor: Story = {
	args: {
		hexCode: '#E1F5FE',
		selected: false,
	},
}
