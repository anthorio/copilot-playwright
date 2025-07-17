import { test, expect } from '../test-base';

test.describe('Test de Autenticación - Estados de Navegación', () => {
  test('debe mostrar botones correctos según el estado de autenticación', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Acceder sin estar logueado y verificar estado inicial
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // 2. Verificar que aparecen los botones Login y Sign Up (estado no autenticado)
    const loginButton = page.locator('[data-testid="navbar-login-button"], nav a:has-text("Login"), .login-btn');
    const signUpButton = page.locator('[data-testid="navbar-signup-button"]');
    
    await expect(loginButton.first()).toBeVisible();
    await expect(signUpButton.first()).toBeVisible();
    
    console.log('✅ Botones Login y Sign Up visibles en estado no autenticado');
    
    // 3. Verificar que NO aparecen botones de usuario autenticado
    const profileButton = page.locator('[data-testid="navbar-user-profile-button"], .profile-btn, .user-menu');
    const logoutButton = page.locator('[data-testid="navbar-logout-button"], nav a:has-text("Logout"), .logout-btn');
    
    await expect(profileButton.first()).not.toBeVisible();
    await expect(logoutButton.first()).not.toBeVisible();
    
    console.log('✅ Botones de perfil y logout correctamente ocultos');
    
    // 4. Proceder a loguearse
    await loginButton.first().click();
    
    // Llenar formulario de login
    const emailInput = page.locator('[data-testid="login-email-input"]');
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // Esperar redirección al dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    console.log('✅ Login completado exitosamente');
    
    // 5. Confirmar que aparecen botones de perfil y logout (estado autenticado)
    await expect(profileButton.first()).toBeVisible();
    await expect(logoutButton.first()).toBeVisible();
    
    console.log('✅ Botones de perfil y logout visibles después del login');
    
    // 6. Verificar que desaparecen los botones login y sign up
    await expect(loginButton.first()).not.toBeVisible();
    await expect(signUpButton.first()).not.toBeVisible();
    
    console.log('✅ Botones Login y Sign Up correctamente ocultos después del login');
    
    // 7. Verificaciones adicionales del estado autenticado
    // Verificar elementos del perfil de usuario
    const userAvatar = page.locator('.user-avatar, .profile-avatar, [data-testid="user-avatar"]');
    const userName = page.locator('.user-name, .profile-name, [data-testid="user-name"]');
    
    const avatarVisible = await userAvatar.first().isVisible().catch(() => false);
    const nameVisible = await userName.first().isVisible().catch(() => false);
    
    if (avatarVisible) {
      console.log('✅ Avatar de usuario visible');
    }
    if (nameVisible) {
      console.log('✅ Nombre de usuario visible');
    }
    
    // 8. Probar funcionalidad de logout para completar el ciclo
    await logoutButton.first().click();
    
    // Verificar que volvemos al estado no autenticado
    await expect(page).toHaveURL(/\/$|\/home/);
    
    // Confirmar que vuelven a aparecer los botones de login/signup
    await expect(loginButton.first()).toBeVisible();
    await expect(signUpButton.first()).toBeVisible();
    
    // Confirmar que desaparecen los botones de usuario autenticado
    await expect(profileButton.first()).not.toBeVisible();
    await expect(logoutButton.first()).not.toBeVisible();
    
    console.log('✅ Logout completado - estado no autenticado restaurado');
    console.log('✅ Cambios de estado de autenticación funcionan correctamente');
  });

});
