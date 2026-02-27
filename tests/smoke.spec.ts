import { expect, test } from '@playwright/test';

test('smoke: homepage sections and locale switch', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Ingenier[ií]a de software con mentalidad de producto/i })).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#image-lab')).toBeVisible();

  await page.getByTestId('locale-toggle').click();
  await expect(page.getByRole('heading', { name: /Software engineering with a product mindset/i })).toBeVisible();
});

test('mobile: image generator is usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.getByRole('link', { name: /Generador|Generator/i }).click();
  await expect(page.locator('#image-lab')).toBeVisible();
  await expect(page.locator('#prompt')).toBeVisible();
  await expect(page.getByRole('button', { name: /Generar imagen|Generate image/i })).toBeVisible();
});
