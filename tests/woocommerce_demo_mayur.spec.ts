import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page click using href', async ({ page }) => {
  // Go to homepage
  await page.goto('https://mustershop-baiersdorf.de/');
  await percySnapshot(page, 'Home Page - Desktop');

  // Locate Shop link using stable href
  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]');

  // Make sure the link is visible
  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  // Hover to trigger any hover-based effects
  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Click the Shop link and wait for the navigation to complete
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);
  console.log('Clicked Shop link and waited for navigation');

  // Verify that the shop grid or product elements appear
  const shopGrid = page.locator('ul.products, div.products, section.products, li.product');
  await expect(shopGrid.first()).toBeVisible();
  console.log('Shop grid is visible');

  await percySnapshot(page, 'Shop Page - Desktop');
});
