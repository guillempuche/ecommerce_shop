import type { Meta, StoryObj } from '@storybook/react'

import { OptionLabel } from './option_label'

const meta: Meta<typeof OptionLabel> = {
	title: 'Components/OptionLabel',
	component: OptionLabel,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		children: { control: 'text' },
	},
	args: {
		children: 'Color',
	},
}

export default meta
type Story = StoryObj<typeof OptionLabel>

export const Default: Story = {
	args: {
		children: 'Color',
	},
}

export const Storage: Story = {
	args: {
		children: 'Storage',
	},
}

export const LongLabel: Story = {
	args: {
		children: 'Technical Specifications',
	},
}
