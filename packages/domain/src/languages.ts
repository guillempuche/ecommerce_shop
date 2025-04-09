/**
 * Language codes defined in BCP 47 standard.
 *
 * E.g. 'en', 'es'
 */
export const ListLanguageCodes = {
	en: 'en', // English
	es: 'es', // Spanish; Castilian
} as const
export type ListLanguageCodes = keyof typeof ListLanguageCodes
