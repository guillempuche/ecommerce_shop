import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Storage } from './storage'

const meta: Meta<typeof Storage> = {
	title: 'Components/Storage',
	component: Storage,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		capacity: { control: 'text' },
		selected: { control: 'boolean' },
		onClick: { action: 'clicked' },
	},
	args: {
		capacity: '128GB',
		selected: false,
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof Storage>

export const Default: Story = {
	args: {
		capacity: '128GB',
		selected: false,
	},
}

export const Selected: Story = {
	args: {
		capacity: '128GB',
		selected: true,
	},
}

export const LargeCapacity: Story = {
	args: {
		capacity: '1TB',
		selected: false,
	},
}

export const MultipleOptions: Story = {
	render: args => (
		<div style={{ display: 'flex', gap: '16px' }}>
			<Storage
				capacity='128GB'
				selected={true}
				onClick={args.onClick ?? (() => {})}
			/>
			<Storage
				capacity='256GB'
				selected={false}
				onClick={args.onClick ?? (() => {})}
			/>
			<Storage
				capacity='512GB'
				selected={false}
				onClick={args.onClick ?? (() => {})}
			/>
			<Storage
				capacity='1TB'
				selected={false}
				onClick={args.onClick ?? (() => {})}
			/>
		</div>
	),
}
