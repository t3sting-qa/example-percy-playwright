import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page final hover click with XPath', async ({ page }) => {
  // 1. Go to home
  await page.goto('https://mustershop-baiersdorf.de/');
  await percySnapshot(page, 'Home Page - Desktop');

  // 2. Wait for Shop link by XPath
  const shopLink = page.locator('xpath=//*[@id="sm-17522106138009907-1"]');
  await expect(shopLink).toBeVisible();

  // 3. Hover to trigger hover effect
  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Optional: check bounding box for debug
  const box = await shopLink.boundingBox();
  console.log('Shop link bounding box:', box);

  // 4. Click and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);
  console.log('Clicked Shop link, waiting for navigation');

  // 5. Confirm Shop page loaded by checking some unique selector
  // Adjust below if you have a better unique one for the Shop page:
  const shopGrid = page.locator('ul.products, div.products, section.products, li.product');
  await expect(shopGrid.first()).toBeVisible();

  // 6. Take Percy snapshot of Shop page
  await percySnapshot(page, 'Shop Page - Desktop');
});
