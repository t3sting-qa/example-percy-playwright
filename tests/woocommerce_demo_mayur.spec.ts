import { test, expect } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Homepage responsiveness + Shop page check', async ({ page }) => {
  // === Desktop Home ===
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    if (window.jQuery && window.jQuery('.your-slider-class').length) {
      window.jQuery('.your-slider-class').slick && window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Home - Desktop');

  const shopLinkDesktop = page.locator('a:has-text("Shop")').first();
  await expect(shopLinkDesktop).toBeVisible();
  await shopLinkDesktop.click();

  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  await expect(page).toHaveURL(/.*shop/);
  await percySnapshot(page, 'Shop Page - Desktop');

  // === Tablet Home ===
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    if (window.jQuery && window.jQuery('.your-slider-class').length) {
      window.jQuery('.your-slider-class').slick && window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Home - Tablet');

  // === Mobile Home ===
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    if (window.jQuery && window.jQuery('.your-slider-class').length) {
      window.jQuery('.your-slider-class').slick && window.jQuery('.your-slider-class').slick('slickPause');
    }
  });

  await percySnapshot(page, 'Home - Mobile');
});
