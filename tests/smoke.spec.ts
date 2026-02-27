import { expect, test } from '@playwright/test';

test('smoke: homepage sections and locale switch', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Ingenier.*aplicada a producto y cliente real/i })).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#image-lab')).toBeVisible();

  await page.getByTestId('locale-toggle').click();
  await expect(page.getByRole('heading', { name: /Software engineering applied to product and real client delivery/i })).toBeVisible();
});

test('mobile: image generator is usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('link', { name: /Generador|Generator/i }).click();
  await expect(page.locator('#image-lab')).toBeVisible();
  await expect(page.locator('#prompt')).toBeVisible();
  await expect(page.getByRole('button', { name: /Generar imagen|Generate image/i })).toBeVisible();

  await page.locator('#prompt').fill('sunset beach with warm cinematic light');
  await page.getByRole('button', { name: /Generar imagen|Generate image/i }).click();
  await expect(page.locator('#image-lab img[alt="Generated image preview"]')).toBeVisible({ timeout: 45000 });
});
