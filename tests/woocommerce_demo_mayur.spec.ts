import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

test('WooCommerce Demo snapshot', async ({ page }) => {
  await page.goto('https://demo.woocommerce.com/');
  await percySnapshot(page, 'WooCommerce Demo Home');
});
