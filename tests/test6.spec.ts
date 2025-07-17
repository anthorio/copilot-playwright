import { test, expect } from '../test-base';

test.describe('Test de Login - Validación de Campos Requeridos', () => {
  test('debe mostrar mensajes de error cuando los campos están vacíos', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Hacer clic en el botón LOGIN en la navbar para ir a la página de login
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // 2. Verificar que los campos de email y contraseña están vacíos (estado inicial)
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    // 3. Hacer clic en el botón de enviar sin llenar los campos
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // 4. Verificar que aparecen mensajes de error para campos requeridos
    // Buscar mensajes de error generales
    const errorMessages = page.locator('.error-message, .field-error, .validation-error');
    await expect(errorMessages.first()).toBeVisible();
    
    // 5. Confirmar que los campos de email y contraseña muestran mensajes específicos
    // Verificar mensaje de error para el campo email
    const emailError = page.locator('[data-testid="login-email-error"]');
    await expect(emailError).toBeVisible();
    await expect(emailError).toContainText('Email is required');
    
    // Verificar mensaje de error para el campo contraseña
    const passwordError = page.locator('[data-testid="login-password-error"]');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toContainText('Password is required');
    
    // Verificaciones adicionales para asegurar que estamos en la página correcta
    // Confirmar que NO hemos sido redirigidos (seguimos en login)
    await expect(page).not.toHaveURL('http://localhost:3000/dashboard');
    
    // Verificar que los campos siguen visibles
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    
    console.log('✅ Mensajes de error mostrados correctamente');
    console.log('✅ Campo email muestra "Email is required"');
    console.log('✅ Campo contraseña muestra "Password is required"');
    console.log('✅ Usuario permanece en la página de login');
  });

});
