import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness and Shop page snapshots', async ({ page }) => {
  // Go to Home page with Desktop viewport
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  // Take Percy snapshot for Home page - Desktop
  await percySnapshot(page, 'Home Page - Desktop', { widths: [1280] });

  // Find Shop link and verify only at Desktop
  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]').first();
  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Take Percy snapshot for Home page - Tablet
  await page.setViewportSize({ width: 768, height: 800 });
  await percySnapshot(page, 'Home Page - Tablet', { widths: [768] });

  // Take Percy snapshot for Home page - Mobile
  await page.setViewportSize({ width: 375, height: 800 });
  await percySnapshot(page, 'Home Page - Mobile', { widths: [375] });

  // Navigate directly to Shop page
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de/shop/');
  console.log('Navigated directly to Shop page');

  // Take Percy snapshot for Shop page - Desktop
  await percySnapshot(page, 'Shop Page - Desktop', { widths: [1280] });

  // Take Percy snapshot for Shop page - Tablet
  await page.setViewportSize({ width: 768, height: 800 });
  await percySnapshot(page, 'Shop Page - Tablet', { widths: [768] });

  // Take Percy snapshot for Shop page - Mobile
  await page.setViewportSize({ width: 375, height: 800 });
  await percySnapshot(page, 'Shop Page - Mobile', { widths: [375] });
});
