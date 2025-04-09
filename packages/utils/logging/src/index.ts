import { rootProvider } from './categories'
import { nodeFormatter } from './node'
import type { LogMessage } from './types'

export * from './categories'

const formatter = nodeFormatter

rootProvider.updateRuntimeSettings({
	channel: {
		type: 'RawLogChannel',
		write: msg => {
			const { text, styles } = formatter.formatMessage(msg as LogMessage)
			// biome-ignore lint/suspicious/noConsole: <required for logging>
			console.log(text, ...styles)
		},
	},
})
