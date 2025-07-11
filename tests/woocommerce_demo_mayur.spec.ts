import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page hover click snapshot', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  await percySnapshot(page, 'Home Page - Desktop');

  // Find the Shop link — make sure selector is correct
  const shopLink = page.locator('a:has-text("Shop")');

  // Hover the Shop link — triggers hover effect and submenu if any
  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Small pause to let hover effect apply
  await page.waitForTimeout(500);

  // Optional: If there’s a submenu, wait for it
  // Example: await page.waitForSelector('.your-submenu-class', { state: 'visible' });

  // Click the Shop link while hover is active
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);

  console.log('Clicked Shop link, URL is:', page.url());

  // Confirm you landed on the correct page
  expect(page.url()).toContain('/shop');

  // Percy snapshot
  await percySnapshot(page, 'Shop Page - Desktop');

  // Tablet
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Tablet');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Mobile');
});
