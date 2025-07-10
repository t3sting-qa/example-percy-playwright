import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page content check', async ({ page }) => {
  // === Desktop: Homepage ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Desktop');

  // === Desktop: Shop page ===
  const shopLink = page.locator('a:has-text("Shop")').first();
  await expect(shopLink).toBeVisible();
  await shopLink.click();

  // ✅ Wait for your unique Shop page element
  const shopPageCategory = page.locator('brodos-shop-page-category');
  await expect(shopPageCategory).toBeVisible();

  await page.waitForTimeout(1000); // Optional: buffer for animation
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet: Homepage ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Tablet');

  // === Mobile: Homepage ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Mobile');
});
