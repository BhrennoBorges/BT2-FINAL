import { test, expect } from '@playwright/test';

test('PWA carrega e exibe resultado da API', async ({ page }) => {
  const base = process.env.E2E_BASE_URL || 'http://localhost:8080';
  await page.goto(base);

  await expect(page).toHaveTitle(/CEP PWA/i);

  await page.fill('input[type="text"]', '70000000');
  await page.click('button[type="submit"]');

  await page.waitForSelector('[data-testid="api-ok"]');
  const resultado = await page.textContent('[data-testid="api-ok"]');

  expect(resultado).toContain('CEP');
});
