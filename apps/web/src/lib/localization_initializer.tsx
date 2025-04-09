'use client'

import { useEffect } from 'react'

import { initLocalization } from '@demo-shop/ui-localization'

export function LocalizationInitializer() {
	useEffect(() => {
		initLocalization()
	}, [])
	return null
}
