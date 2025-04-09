import type { Meta, StoryObj } from '@storybook/react'

import { SpecificationRow } from './specification_row'

const meta: Meta<typeof SpecificationRow> = {
	title: 'Components/SpecificationRow',
	component: SpecificationRow,
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		data: { control: 'text' },
	},
	args: {
		label: 'Processor',
		data: 'Snapdragon 8 Gen 2 Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)',
	},
}

export default meta
type Story = StoryObj<typeof SpecificationRow>

export const Default: Story = {
	args: {
		label: 'Processor',
		data: 'Snapdragon 8 Gen 2',
	},
}

export const LongText: Story = {
	args: {
		label: 'Display',
		data: 'Dynamic AMOLED 2X, 120Hz, HDR10+, 1200 nits (HBM), 1750 nits (peak), 6.1 inches, 1080 x 2340 pixels, 19.5:9 ratio (~425 ppi density)',
	},
}

export const ShortSpec: Story = {
	args: {
		label: 'RAM',
		data: '8GB',
	},
}

export const ConstrainedWidth: Story = {
	args: {
		label: 'Processor',
		data: 'Snapdragon 8 Gen 2 Octa-core (1x3.2 GHz Cortex-X3 & 2x2.8 GHz Cortex-A715 & 2x2.8 GHz Cortex-A710 & 3x2.0 GHz Cortex-A510)',
	},
	decorators: [
		Story => (
			<div style={{ maxWidth: '500px' }}>
				<Story />
			</div>
		),
	],
}
