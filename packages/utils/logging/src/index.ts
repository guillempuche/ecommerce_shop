import { rootProvider } from './categories.js'
import { nodeFormatter } from './formatters/node.js'
import { uiFormatter } from './formatters/ui.js'
import type { LogMessage } from './types.js'

export * from './categories.js'

const isNodeEnvironment = (): boolean => {
	try {
		// Check for Node.js process
		return (
			typeof process !== 'undefined' &&
			process.versions != null &&
			process.versions.node != null
		)
	} catch {
		return false
	}
}
// const formatter = isNode ? nodeFormatter : uiFormatter // Both RN and Web use browser formatter
const formatter = isNodeEnvironment() ? nodeFormatter : uiFormatter

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
