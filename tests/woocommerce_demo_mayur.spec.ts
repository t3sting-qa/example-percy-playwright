import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Test Onlineshop1 Home Page Responsiveness', async ({ page }) => {
  await page.goto('https://mustershop-baiersdorf.de');

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
  await page.goto('https://mustershop-baiersdorf.de');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();
  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');

  // Open mobile/tablet menu if needed
  const menuButtonTablet = page.locator('button[aria-label="Menü"]'); // adjust selector!
  if (await menuButtonTablet.isVisible()) {
    await menuButtonTablet.click();
  }

  const shopLinkTablet = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkTablet).toBeVisible();
  await percySnapshot(page, 'Header - Tablet');

  // === Mobile ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');

  // Open mobile menu if needed
  const menuButtonMobile = page.locator('button[aria-label="Menü"]'); // adjust selector!
  if (await menuButtonMobile.isVisible()) {
    await menuButtonMobile.click();
  }

  const shopLinkMobile = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkMobile).toBeVisible();
  await percySnapshot(page, 'Header - Mobile');
});
