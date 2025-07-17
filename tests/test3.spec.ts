import { test, expect } from '../test-base';

test.describe('Test de Login - Verificación de Estado de Carga', () => {
  test('debe mostrar estado de carga y deshabilitar botón durante el proceso', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Hacer clic en el botón LOGIN en la navbar
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // 2. Introducir email válido en el campo correspondiente
    const emailInput = page.locator('[data-testid="login-email-input"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    // 3. Introducir contraseña válida en el campo correspondiente
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    
    // 4. Hacer clic en el botón Sign In y verificar estados de carga
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeVisible();
    
    // Verificar estado inicial del botón (debe estar habilitado)
    await expect(submitButton).toBeEnabled();
    
    // Hacer clic en enviar
    await submitButton.click();

    // 5. Verificar que el botón muestra "Signing In..." durante el proceso
    await expect(submitButton).toContainText('Signing In...');
    
    // 6. Verificar que el botón se deshabilita durante la carga
    await expect(submitButton).toBeDisabled();
    
    console.log('✅ Estado de carga "Signing In..." mostrado correctamente');
    console.log('✅ Botón deshabilitado durante el proceso de carga');
  });

});
