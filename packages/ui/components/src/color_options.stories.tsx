import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { ColorOptions } from './color_options'

const titaniumColorOptions = [
	{
		name: 'Negro Titanium',
		hexCode: '#62605F',
		imageUrl: new URL('http://example.com/negro-titanium.webp'),
	},
	{
		name: 'Violeta Titanium',
		hexCode: '#4D4E5F',
		imageUrl: new URL('http://example.com/violeta-titanium.webp'),
	},
	{
		name: 'Gris Titanium',
		hexCode: '#ACA49B',
		imageUrl: new URL('http://example.com/gris-titanium.webp'),
	},
	{
		name: 'Amarillo Titanium',
		hexCode: '#F0E1B9',
		imageUrl: new URL('http://example.com/amarillo-titanium.webp'),
	},
]

const meta: Meta<typeof ColorOptions> = {
	title: 'Components/ColorOptions',
	component: ColorOptions,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		onColorSelect: { action: 'colorSelected' },
		defaultSelected: {
			control: 'select',
			options: [
				undefined,
				'Negro Titanium',
				'Violeta Titanium',
				'Gris Titanium',
				'Amarillo Titanium',
			],
		},
	},
	args: {
		colorOptions: titaniumColorOptions,
		onColorSelect: fn(),
		defaultSelected: undefined,
		selectedColor: null,
	},
}

export default meta
type Story = StoryObj<typeof ColorOptions>

export const Default: Story = {
	args: {
		colorOptions: titaniumColorOptions,
	},
}

export const NegroTitanium: Story = {
	args: {
		colorOptions: titaniumColorOptions,
		defaultSelected: 'Negro Titanium',
		selectedColor: titaniumColorOptions[0],
	},
}

export const VioletaTitanium: Story = {
	args: {
		colorOptions: titaniumColorOptions,
		defaultSelected: 'Violeta Titanium',
		selectedColor: titaniumColorOptions[1],
	},
}

export const GrisTitanium: Story = {
	args: {
		colorOptions: titaniumColorOptions,
		defaultSelected: 'Gris Titanium',
		selectedColor: titaniumColorOptions[2],
	},
}

export const AmarilloTitanium: Story = {
	args: {
		colorOptions: titaniumColorOptions,
		defaultSelected: 'Amarillo Titanium',
		selectedColor: titaniumColorOptions[3],
	},
}
