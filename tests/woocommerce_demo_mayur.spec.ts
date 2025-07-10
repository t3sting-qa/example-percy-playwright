import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Header navigation responsiveness and links', async ({ page }) => {
  // === Desktop: Functional Shop link ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();
  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet: Visual only ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Header - Tablet');

  // === Mobile: Visual only ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Header - Mobile');
});
