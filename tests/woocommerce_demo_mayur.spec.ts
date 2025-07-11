import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page click', async ({ page }) => {
  await page.goto('https://mustershop-baiersdorf.de');

  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]').first();

  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Click and wait for navigation in same tab
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);
  console.log('Clicked Shop link and waited for navigation');

  // Take Percy snapshot of the Shop page
  await percySnapshot(page, 'Shop Page - Same Tab');
});
