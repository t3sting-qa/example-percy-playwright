import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('Test Google Home Page', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await percySnapshot(page, 'Google Home Page');
});
