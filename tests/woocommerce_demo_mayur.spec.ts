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
  // Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('https://mustershop-baiersdorf.de');

  // Functional: check header link
  const aboutUsLink = page.locator('a:has-text("About Us")');
  await expect(aboutUsLink).toBeVisible();

  // Click it and confirm navigation works
  await aboutUsLink.click();
  await expect(page).toHaveURL(/.*ueber-uns/);

  // Percy snapshot of Shop page after click
  await percySnapshot(page, 'About Us Page - Desktop');

  // Tablet
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('https://mustershop-baiersdorf.de');
  await expect(aboutUsLink).toBeVisible();
  await percySnapshot(page, 'Header - Tablet');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('https://mustershop-baiersdorf.de');
  await expect(aboutUsLink).toBeVisible();
  await percySnapshot(page, 'Header - Mobile');
});
