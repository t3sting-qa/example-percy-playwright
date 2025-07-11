import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page click with unique XPath', async ({ page }) => {
  // 1. Open home page
  await page.goto('https://mustershop-baiersdorf.de/');
  await percySnapshot(page, 'Home Page - Desktop');

  // 2. Use EXACT XPath you found
  const shopLink = page.locator('xpath=//*[@id="sm-17522106138009907-1"]');

  // 3. Wait for visible
  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  // 4. Hover to trigger hover CSS effect (if any)
  await shopLink.hover();
  console.log('Hovered over Shop link');

  // 5. Log href for confirmation
  const href = await shopLink.getAttribute('href');
  console.log('Shop link href:', href);

  // 6. Click and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);
  console.log('Clicked Shop link and waited for navigation');

  // 7. Confirm Shop page loaded — use any unique product block
  const shopGrid = page.locator('ul.products, div.products, section.products, li.product');
  await expect(shopGrid.first()).toBeVisible();

  // 8. Percy snapshot of the Shop page
  await percySnapshot(page, 'Shop Page - Desktop');
});
