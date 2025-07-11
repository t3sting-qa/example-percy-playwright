import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness and Shop page snapshots', async ({ page }) => {
  // Go to Home page
  await page.goto('https://mustershop-baiersdorf.de');

  // Take Percy snapshots for Home page in desktop, tablet, mobile widths
  await percySnapshot(page, 'Home Page - Desktop', { widths: [1280] });
  await percySnapshot(page, 'Home Page - Tablet', { widths: [768] });
  await percySnapshot(page, 'Home Page - Mobile', { widths: [375] });

  // Find Shop link and verify
  const shopLink = page.locator('a[href="https://mustershop-baiersdorf.de/shop/"]').first();
  await expect(shopLink).toBeVisible();
  console.log('Shop link is visible');

  await shopLink.hover();
  console.log('Hovered over Shop link');

  // Navigate directly to Shop page (same-tab)
  await page.goto('https://mustershop-baiersdorf.de/shop/');
  console.log('Navigated directly to Shop page');

  // Take Percy snapshots for Shop page in desktop, tablet, mobile widths
  await percySnapshot(page, 'Shop Page - Desktop', { widths: [1280] });
  await percySnapshot(page, 'Shop Page - Tablet', { widths: [768] });
  await percySnapshot(page, 'Shop Page - Mobile', { widths: [375] });
});
