import { ListLanguageCodes } from '@demo-shop/domain'

/**
 * Detects the browser's language and returns a supported language code.
 * Falls back to "es" if no supported language is found.
 */
export function detectDeviceLanguage(): ListLanguageCodes {
	const browserLang = navigator?.language?.split('-')[0]?.toLowerCase() || 'es'
	return browserLang in ListLanguageCodes
		? (browserLang as ListLanguageCodes)
		: ListLanguageCodes.es
}
