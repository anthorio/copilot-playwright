import { test, expect } from '../test-base';

test.describe('Test de Logout - Verificación de Redirección y Estado', () => {
  test('debe hacer logout correctamente y mostrar botones de estado no autenticado', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Logearse en la página
    // Ir a la página de login
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
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
    
    // Verificar que el login fue exitoso (redirección al dashboard)
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    console.log('✅ Login completado exitosamente');
    
    // Verificar que estamos en estado autenticado
    const logoutButton = page.locator('[data-testid="navbar-logout-button"], nav a:has-text("Logout"), .logout-btn');
    await expect(logoutButton.first()).toBeVisible();
    
    console.log('✅ Estado autenticado confirmado - botón logout visible');
    
    // 2. Clicar en el botón de logout
    await logoutButton.first().click();
    
    console.log('✅ Clic en botón logout realizado');
    
    // 3. Verificar que redirecciona a la página principal
    await expect(page).toHaveURL('http://localhost:3000/');
    
    console.log('✅ Redirección a página principal exitosa');
    
    // 4. Confirmar que aparecen los botones de Login y Sign up
    const loginButtonAfterLogout = page.locator('[data-testid="navbar-login-button"], nav a:has-text("Login"), .login-btn');
    const signUpButton = page.locator('[data-testid="navbar-signup-button"]');
    
    await expect(loginButtonAfterLogout.first()).toBeVisible();
    await expect(signUpButton.first()).toBeVisible();
    
    console.log('✅ Botones Login y Sign Up visibles después del logout');
    
    // 5. Verificaciones adicionales - confirmar que desaparecen botones de usuario autenticado
    const profileButton = page.locator('[data-testid="navbar-user-profile-button"], .profile-btn, .user-menu');
    const logoutButtonCheck = page.locator('[data-testid="navbar-logout-button"], nav a:has-text("Logout"), .logout-btn');
    
    await expect(profileButton.first()).not.toBeVisible();
    await expect(logoutButtonCheck.first()).not.toBeVisible();
    
    console.log('✅ Botones de perfil y logout correctamente ocultos');
    
    // 6. Verificar que el contenido de la página principal es visible
    const homeContent = page.locator('h1, .hero-section, .main-content, #home');
    await expect(homeContent.first()).toBeVisible();
    
    console.log('✅ Contenido de página principal visible');
    
    // 7. Verificación final - probar que podemos hacer login nuevamente
    await loginButtonAfterLogout.first().click();
    
    // Verificar que llegamos a la página de login
    const emailInputCheck = page.locator('[data-testid="login-email-input"]');
    await expect(emailInputCheck).toBeVisible();
    
    console.log('✅ Funcionalidad de navegación post-logout verificada');
    console.log('✅ Logout completo - estado no autenticado restaurado correctamente');
  });

});
