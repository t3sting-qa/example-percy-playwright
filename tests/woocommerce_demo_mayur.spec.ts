import { test } from '@playwright/test';
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
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  // Functional: check header link
  const shopLink = page.locator('a:has-text("Shop")');
  await expect(shopLink).toBeVisible();

  // Click it and confirm navigation works
  await shopLink.click();
  await expect(page).toHaveURL(/.*shop/);

  // Percy snapshot of Shop page after click
  await percySnapshot(page, 'Shop Page - Desktop');

  // Tablet
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await expect(shopLink).toBeVisible();
  await percySnapshot(page, 'Header - Tablet');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://YOUR-SITE.com');
  await expect(shopLink).toBeVisible();
  await percySnapshot(page, 'Header - Mobile');
});
