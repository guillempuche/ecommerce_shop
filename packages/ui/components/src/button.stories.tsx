import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Button } from './button'

const meta: Meta<typeof Button> = {
	title: 'Components/Button',
	component: Button,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'A customizable button component for user interactions.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		feedback: {
			control: 'radio',
			options: ['Standard', 'Primary'],
			description: 'Visual style of the button',
			table: {
				type: { summary: 'Standard | Primary' },
				defaultValue: { summary: 'Primary' },
			},
		},
		extraHeight: {
			control: 'boolean',
			description: 'Makes the button taller',
			table: {
				type: { summary: 'boolean' },
			},
		},
		state: {
			control: 'select',
			options: ['Default', 'Hover', 'Active', 'Disabled'],
			description: 'Visual state of the button',
			table: {
				type: { summary: 'Default | Hover | Active | Disabled' },
				defaultValue: { summary: 'Default' },
			},
		},
		disabled: {
			control: 'boolean',
			description: 'Disables button interaction',
			table: {
				type: { summary: 'boolean' },
			},
		},
		children: {
			control: 'text',
			description: 'Button content',
			table: {
				type: { summary: 'ReactNode' },
			},
		},
		onClick: {
			action: 'clicked',
			description: 'Function called when button is clicked',
			table: {
				type: { summary: '(event: MouseEvent) => void' },
				defaultValue: { summary: 'undefined' },
			},
		},
	},
	args: {
		children: 'BUTTON',
		feedback: 'Primary',
		extraHeight: false,
		state: 'Default',
		disabled: false,
		onClick: fn(),
	},
}

export default meta
type Story = StoryObj<typeof Button>

export const Documentation: Story = {
	render: function Render() {
		const containerStyle = {
			display: 'grid',
			gridTemplateColumns: '1fr',
			gap: '32px',
			padding: '20px',
			maxWidth: '600px',
		}

		const groupStyle = {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '16px',
		}

		const labelStyle = {
			marginBottom: '12px',
			gridColumn: '1 / -1',
		}

		const stateStyle = {
			fontSize: '12px',
			color: '#666',
			marginBottom: '4px',
		}

		return (
			<div style={containerStyle}>
				<div>
					<div style={labelStyle}>Standard Buttons</div>
					<div style={groupStyle}>
						<div>
							<div style={stateStyle}>Default</div>
							<Button feedback='Standard' state='Default'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Hover</div>
							<Button feedback='Standard' state='Hover'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Active</div>
							<Button feedback='Standard' state='Active'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Disabled</div>
							<Button feedback='Standard' state='Disabled'>
								BUTTON
							</Button>
						</div>
					</div>
				</div>

				<div>
					<div style={labelStyle}>Primary Buttons</div>
					<div style={groupStyle}>
						<div>
							<div style={stateStyle}>Default</div>
							<Button feedback='Primary' state='Default'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Hover</div>
							<Button feedback='Primary' state='Hover'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Active</div>
							<Button feedback='Primary' state='Active'>
								BUTTON
							</Button>
						</div>
						<div>
							<div style={stateStyle}>Disabled</div>
							<Button feedback='Primary' state='Disabled'>
								BUTTON
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	},
	parameters: {
		docs: {
			source: {
				code: `<Button feedback="Standard">Standard Button</Button>
<Button>Primary Button</Button>
<Button disabled>Disabled Button</Button>`,
			},
		},
	},
}

export const Standard: Story = {
	render: function Render() {
		const containerStyle = {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '16px',
		}

		const stateStyle = {
			fontSize: '12px',
			color: '#666',
			marginBottom: '4px',
		}

		return (
			<div style={containerStyle}>
				<div>
					<div style={stateStyle}>Default</div>
					<Button feedback='Standard' state='Default'>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Hover</div>
					<Button feedback='Standard' state='Hover' extraHeight>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Active</div>
					<Button feedback='Standard' state='Active' extraHeight>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Disabled</div>
					<Button feedback='Standard' state='Disabled' extraHeight>
						BUTTON
					</Button>
				</div>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story: 'The Standard button is typically used for secondary actions.',
			},
		},
	},
}

export const Primary: Story = {
	render: function Render() {
		const containerStyle = {
			display: 'grid',
			gridTemplateColumns: 'repeat(4, 1fr)',
			gap: '16px',
		}

		const stateStyle = {
			fontSize: '12px',
			color: '#666',
			marginBottom: '4px',
		}

		return (
			<div style={containerStyle}>
				<div>
					<div style={stateStyle}>Default</div>
					<Button feedback='Primary' state='Default'>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Hover</div>
					<Button feedback='Primary' state='Hover' extraHeight>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Active</div>
					<Button feedback='Primary' state='Active' extraHeight>
						BUTTON
					</Button>
				</div>
				<div>
					<div style={stateStyle}>Disabled</div>
					<Button feedback='Primary' state='Disabled' extraHeight>
						BUTTON
					</Button>
				</div>
			</div>
		)
	},
	parameters: {
		docs: {
			description: {
				story:
					'The Primary button is used for the main action on a page or within a form.',
			},
		},
	},
}

export const StandardDefault: Story = {
	args: {
		feedback: 'Standard',
		state: 'Default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the Standard button.',
			},
		},
	},
}

export const StandardHover: Story = {
	args: {
		feedback: 'Standard',
		state: 'Hover',
	},
	parameters: {
		docs: {
			description: {
				story: 'Hover state of the Standard button.',
			},
		},
	},
}

export const StandardActive: Story = {
	args: {
		feedback: 'Standard',
		state: 'Active',
	},
	parameters: {
		docs: {
			description: {
				story: 'Active state of the Standard button (when being clicked).',
			},
		},
	},
}

export const StandardDisabled: Story = {
	args: {
		feedback: 'Standard',
		state: 'Disabled',
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled state of the Standard button.',
			},
		},
	},
}

export const PrimaryDefault: Story = {
	args: {
		feedback: 'Primary',
		state: 'Default',
	},
	parameters: {
		docs: {
			description: {
				story: 'Default state of the Primary button.',
			},
		},
	},
}

export const PrimaryHover: Story = {
	args: {
		feedback: 'Primary',
		state: 'Hover',
	},
	parameters: {
		docs: {
			description: {
				story: 'Hover state of the Primary button.',
			},
		},
	},
}

export const PrimaryActive: Story = {
	args: {
		feedback: 'Primary',
		state: 'Active',
	},
	parameters: {
		docs: {
			description: {
				story: 'Active state of the Primary button (when being clicked).',
			},
		},
	},
}

export const PrimaryDisabled: Story = {
	args: {
		feedback: 'Primary',
		state: 'Disabled',
	},
	parameters: {
		docs: {
			description: {
				story: 'Disabled state of the Primary button.',
			},
		},
	},
}
