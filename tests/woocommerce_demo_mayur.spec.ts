import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page click using nth match', async ({ page }) => {
  await page.goto('https://mustershop-baiersdorf.de/');
  await percySnapshot(page, 'Home Page - Desktop');

  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]').first();

  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  await shopLink.hover();
  console.log('Hovered over Shop link');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);
  console.log('Clicked Shop link and waited for navigation');

  const shopGrid = page.locator('ul.products, div.products, section.products, li.product');
  await expect(shopGrid.first()).toBeVisible();
  console.log('Shop grid is visible');

  await percySnapshot(page, 'Shop Page - Desktop');
});
