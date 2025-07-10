import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page check', async ({ page }) => {
  // === Desktop Home ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');

  await percySnapshot(page, 'Home - Desktop');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();

  // Wait for navigation to complete and Shop page content to appear
  await expect(page).toHaveURL(/.*shop/);
  // Add a check for something unique on Shop page:
  const shopContent = page.locator('.woocommerce-products, .products, h1:has-text("Shop")');
  await expect(shopContent.first()).toBeVisible();

  await page.waitForTimeout(1000); // Small buffer if needed
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet Home ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'Home - Tablet');

  // === Mobile Home ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');
  await percySnapshot(page, 'Home - Mobile');
});
