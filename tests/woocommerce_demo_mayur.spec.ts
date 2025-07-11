import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page click verification', async ({ page }) => {
  // === Desktop ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  await percySnapshot(page, 'Home Page - Desktop');

  const shopLink = page.locator('a:has-text("Shop")').first();
  await expect(shopLink).toBeVisible();

  const href = await shopLink.getAttribute('href');
  console.log('Shop link href:', href);

  const box = await shopLink.boundingBox();
  console.log('Shop link bounding box:', box);

  // Highlight the link in Percy snapshot
  await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('a'));
    els.forEach(el => {
      if (el.textContent?.includes('Shop')) {
        el.style.outline = '5px solid red';
      }
    });
  });

  // Percy snapshot BEFORE click to see highlight
  await percySnapshot(page, 'Before Shop Click - Desktop');

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    shopLink.click({ force: true }),
  ]);

  console.log('Navigation finished, current URL:', page.url());

  // Percy snapshot AFTER navigation
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Tablet');

  // === Mobile ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await percySnapshot(page, 'Home Page - Mobile');
});
