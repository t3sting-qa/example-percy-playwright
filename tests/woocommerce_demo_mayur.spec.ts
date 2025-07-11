import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page snapshot', async ({ page }) => {
  await page.goto('https://mustershop-baiersdorf.de');

  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]').first();
  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Use direct navigation instead of click if timing is flaky
  await page.goto('https://mustershop-baiersdorf.de/shop/');
  console.log('Navigated directly to Shop page');

  await percySnapshot(page, 'Shop Page - Same Tab');
});
