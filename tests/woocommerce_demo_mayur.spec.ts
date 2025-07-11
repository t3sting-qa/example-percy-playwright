import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page check', async ({ page }) => {
  // === Desktop: Home Page ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Desktop');

  // === Desktop: Click Shop ===
  const shopLink = page.locator('a:has-text("Shop")').first();
  await expect(shopLink).toBeVisible();

  // Click Shop and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click(),
  ]);

  //  Log current URL to verify Shop page opened
  console.log(' Current URL after clicking Shop:', await page.url());

  // Confirm a product grid or known element on Shop page
  const shopGrid = page.locator('ul.products, div.products, section.products, li.product');
  await expect(shopGrid.first()).toBeVisible();

  await page.waitForTimeout(1000); // buffer if needed
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet: Home Page ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Tablet');

  // === Mobile: Home Page ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Mobile');
});
