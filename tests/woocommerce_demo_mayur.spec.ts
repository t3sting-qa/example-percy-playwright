import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Test Onlineshop1 Home Page Responsiveness', async ({ page }) => {
  await page.goto('https://test-site.com');

  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await percySnapshot(page, 'Home - Desktop');

  // Tablet
  await page.setViewportSize({ width: 1024, height: 768 });
  await percySnapshot(page, 'Home - Tablet');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await percySnapshot(page, 'Home - Mobile');
});

test('Header navigation responsiveness and links', async ({ page }) => {
  // === Desktop ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://test-site.com');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();
  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://test-site.com');

  const menuButtonTablet = page.locator('button[aria-label="Menü"], button[aria-label="Menu"]');
  if (await menuButtonTablet.isVisible()) {
    await menuButtonTablet.click();
  }

  const shopLinkTablet = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkTablet).toBeVisible();
  await shopLinkTablet.click();
  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Header - Tablet');

  // === Mobile ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://test-site.com');

  const menuButtonMobile = page.locator('button[aria-label="Menü"], button[aria-label="Menu"]');
  if (await menuButtonMobile.isVisible()) {
    await menuButtonMobile.click();
  }

  const shopLinkMobile = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkMobile).toBeVisible();
  await shopLinkMobile.click();
  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Header - Mobile');
});
