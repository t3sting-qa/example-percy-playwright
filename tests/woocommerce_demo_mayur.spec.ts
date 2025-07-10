import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Header navigation responsiveness and links', async ({ page }) => {
  // === Desktop ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://test-site.com');

  // OPTIONAL: Stop slider BEFORE snapshot if needed
  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Home - Desktop');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();

  // ✅ Wait for new page load + add an **extra delay** for content to settle
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(/.*shop/);

  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://test-site.com');

  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Header - Tablet');

  // === Mobile ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://test-site.com');

  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Header - Mobile');
});
