import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Test Onlineshop1 Home Page', async ({ page }) => {
  await page.goto('https://mustershop-baiersdorf.de/');
  await percySnapshot(page, 'Onlineshop1 Home Page');
});
