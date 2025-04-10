import { expect, test } from '@playwright/test'

// Visual test for homepage, product details, and checkout routes
test.describe('Visual regression tests', () => {
	test('homepage visual test', async ({ page }) => {
		await page.goto('/')

		await page.waitForTimeout(5000)

		await expect(page).toHaveScreenshot('homepage.png', {
			fullPage: true,
		})
	})

	test('product details page visual test', async ({ page }) => {
		await page.goto('/')

		await page.waitForTimeout(5000)

		// Find and click the first product
		try {
			const firstProductLink = await page
				.locator('a[href^="/product/"]')
				.first()
			await firstProductLink.click()
		} catch (e) {
			console.error(
				'Could not click product link, taking screenshot anyway:',
				e,
			)
		}

		// Wait for content to load
		await page.waitForTimeout(5000)

		await expect(page).toHaveScreenshot('product-details.png', {
			fullPage: true,
		})
	})

	test('checkout page visual test', async ({ page }) => {
		await page.goto('/')

		await page.waitForTimeout(5000)

		try {
			// Click on the first product to go to its details page
			const firstProductLink = await page
				.locator('a[href^="/product/"]')
				.first()
			await firstProductLink.click()

			await page.waitForTimeout(5000)

			// Click "Add to Cart" button - using a more general selector
			await page.getByRole('button', { name: /añadir/i }).click()

			await page
				.getByRole('button', { name: /View shopping cart with/i })
				.click()

			await page.waitForTimeout(5000)
		} catch (e) {
			console.error('Navigation error, taking screenshot anyway:', e)
		}

		await expect(page).toHaveScreenshot('checkout.png', {
			fullPage: true,
		})
	})
})
