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
