import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Search } from './search'

const meta: Meta<typeof Search> = {
	title: 'Components/Search',
	component: Search,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		onChange: { action: 'changed' },
		onClear: { action: 'cleared' },
		initialValue: { control: 'text' },
	},
	args: {
		placeholder: 'Search for a smartphone...',
		onChange: fn(),
		onClear: fn(),
		initialValue: '',
	},
}

export default meta
type Story = StoryObj<typeof Search>

export const Empty: Story = {
	args: {
		initialValue: '',
	},
}

export const WithValue: Story = {
	args: {
		initialValue: 'iPhone',
	},
}

export const CustomPlaceholder: Story = {
	args: {
		placeholder: 'Find your device...',
		initialValue: '',
	},
}

export const ConstrainedWidth: Story = {
	args: {
		initialValue: '',
	},
	decorators: [
		Story => (
			<div style={{ maxWidth: '300px' }}>
				<Story />
			</div>
		),
	],
}
