import { test, expect } from '@playwright/test';

test('página principal carga correctamente', async ({ page }) => {
  // Ir a la página principal (usa la baseURL configurada)
  await page.goto('/');

  // Verificar que la página tenga un título
  await expect(page).toHaveTitle(/./); // Cualquier título no vacío

  // Opcional: Verificar que aparezca algún elemento específico
  // await expect(page.getByRole('heading', { name: 'Mi Aplicación' })).toBeVisible();
});

test('navegación básica', async ({ page }) => {
  await page.goto('/');

  // Ejemplo: hacer clic en un enlace o botón
  // await page.getByRole('link', { name: 'Acerca de' }).click();
  
  // Verificar que navegó correctamente
  // await expect(page).toHaveURL('/about');
  
  console.log('🎯 Configura este test según los elementos de tu aplicación');
});

test('formulario básico', async ({ page }) => {
  await page.goto('/');

  // Ejemplo: llenar un formulario
  // await page.getByLabel('Nombre').fill('Test Usuario');
  // await page.getByLabel('Email').fill('test@example.com');
  // await page.getByRole('button', { name: 'Enviar' }).click();
  
  // Verificar resultado
  // await expect(page.getByText('Formulario enviado exitosamente')).toBeVisible();
  
  console.log('📝 Configura este test según los formularios de tu aplicación');
});
