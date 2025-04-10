import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	testDir: './tests',
	timeout: 30000,
	expect: {
		timeout: 5000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 1,
	reporter: 'html',

	use: {
		baseURL: 'http://localhost:3000',

		// Capture screenshot on failure
		screenshot: 'only-on-failure',

		// Viewport settings
		viewport: { width: 1280, height: 720 },

		// Collect trace when retrying the failed test
		trace: 'on-first-retry',
	},

	// Configure projects for different viewports
	projects: [
		{
			name: 'desktop',
			use: {
				...devices['Desktop Chrome'],
				viewport: { width: 1280, height: 720 },
			},
		},
		{
			name: 'tablet',
			use: {
				...devices['iPad Mini'],
			},
		},
		{
			name: 'mobile',
			use: {
				...devices['iPhone 13'],
			},
		},
	],

	webServer: [
		{
			command: 'yarn workspace @demo-shop/apps-server start',
			url: 'http://localhost:3001',
			reuseExistingServer: !process.env.CI,
		},
		{
			command: 'yarn workspace @demo-shop/apps-web dev',
			url: 'http://localhost:3000',
			reuseExistingServer: !process.env.CI,
		},
	],
})
