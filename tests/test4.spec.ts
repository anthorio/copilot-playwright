import { test, expect } from '../test-base';

test.describe('Test de Login - Redirección a Página de Registro', () => {
  test('debe redirigir a la página de registro al hacer clic en "Create one here"', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Hacer clic en el botón LOGIN en la navbar para ir a la página de login
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // 2. Hacer clic en "Create one here" para ir a la página de registro
    const createAccountLink = page.locator('text=Create one here');
    await expect(createAccountLink).toBeVisible();
    await createAccountLink.click();
    
    // 3. Verificar que se redirecciona a la página de registro
    await expect(page).toHaveURL('http://localhost:3000/sign-up');
    
    // Verificaciones adicionales para confirmar que estamos en la página de registro
    // Verificar que aparece el formulario de registro con la clase específica
    const registerForm = page.locator('.signup-form');
    await expect(registerForm).toBeVisible();
    
    console.log('✅ Redirección a página de registro exitosa');
    console.log('✅ URL correcta: /sign-up');
    console.log('✅ Formulario de registro visible');
  });

});
