import { test, expect } from '../test-base';

test.describe('Test de Login - Validación de Contraseña Requerida', () => {
  test('debe mostrar error cuando se intenta login sin contraseña', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Hacer clic en el botón LOGIN en la navbar
    const loginButton = page.locator('[data-testid="navbar-login-button"]');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    
    // 2. Introducir email válido en el campo correspondiente
    const emailInput = page.locator('[data-testid="login-email-input"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    
    // 3. Hacer clic en el botón Sign In (sin introducir contraseña)
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // 4. Verificar que aparece el mensaje de error "password is required"
    const errorMessage = page.locator('text=password is required');
    await expect(errorMessage).toBeVisible();
    
    // 5. Confirmar que el usuario permanece en la misma página (página de login)
    // Verificamos que seguimos en la página de login comprobando que los elementos del formulario siguen visibles
    await expect(emailInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Verificación adicional: confirmar que NO hemos sido redirigidos al dashboard
    await expect(page).not.toHaveURL('http://localhost:3000/dashboard');
    
    console.log('✅ Error de contraseña requerida mostrado correctamente');
    console.log('✅ Usuario permanece en la página de login');
    console.log('✅ No se produjo redirección no deseada');
  });

});
