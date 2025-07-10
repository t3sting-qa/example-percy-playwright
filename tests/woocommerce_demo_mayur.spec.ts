import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page content check', async ({ page }) => {
  // === Home Desktop ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Desktop');

  // === Click Shop link ===
  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();

  // === Wait for any product grid ===
  const shopGrid = page.locator('.brodos-shop-page-category');
  await expect(shopGrid.first()).toBeVisible();

  await page.waitForTimeout(1000);
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Home Tablet ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Tablet');

  // === Home Mobile ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home - Mobile');
});
