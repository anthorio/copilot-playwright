import { test, expect } from '../test-base';

test.describe('Test de Login - Flujo Completo', () => {
  test('debe permitir login y redireccionar al dashboard', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Hacer clic en el botón LOGIN en la navbar
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // 2. Introducir email en el campo correspondiente
    const emailInput = page.locator('[data-testid="login-email-input"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    // 3. Introducir contraseña en el campo correspondiente
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    
    // 4. Hacer clic en el botón Sign In
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // 5. Verificar redirección al dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    // 6. Confirmar que aparece el botón de perfil de usuario en la navegación
    const userProfileButton = page.locator('[data-testid="navbar-user-profile-button"]');
    await expect(userProfileButton).toBeVisible();
    
    // Verificaciones adicionales del perfil de usuario
    const userAvatar = userProfileButton.locator('.user-avatar');
    const userName = userProfileButton.locator('.user-name');
    
    await expect(userAvatar).toBeVisible();
    await expect(userName).toBeVisible();
    
    console.log('✅ Login completado exitosamente');
    console.log('✅ Usuario redirigido al dashboard');
    console.log('✅ Perfil de usuario visible en navbar');
  });

});