import { test, expect } from '@playwright/test';

test('PWA carrega página inicial com campo de CEP', async ({ page }) => {
  const base = process.env.E2E_BASE_URL || 'http://localhost:8080';

  // Abre o PWA
  await page.goto(base);

  // Verifica título da página
  await expect(page).toHaveTitle(/CEP PWA/i);

  // Verifica se o input de CEP está visível
  await expect(page.getByPlaceholder('Ex: 70000-000')).toBeVisible();

  // Verifica se o botão de buscar está visível
  await expect(page.getByRole('button', { name: /buscar/i })).toBeVisible();
});
