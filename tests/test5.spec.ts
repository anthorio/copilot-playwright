import { test, expect } from '../test-base';

test.describe('Test de Registro - Flujo Completo', () => {
  test('debe completar el registro y redirigir al dashboard con mensaje de bienvenida', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Ir a la página del registro (navegar directamente o a través del login)
    await page.goto('http://localhost:3000/sign-up');
    
    // Verificar que estamos en la página de registro
    const registerForm = page.locator('.signup-form');
    await expect(registerForm).toBeVisible();
    
    // 2. Completar todos los campos requeridos con datos válidos
    // Campo de nombre
    const nameInput = page.locator('[data-testid="signup-firstname-input"], input[name="name"], #name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('Juan');
    
    // Campo de apellido
    const lastNameInput = page.locator('[data-testid="signup-lastname-input"]');
    await expect(lastNameInput).toBeVisible();
    await lastNameInput.fill('Pérez');
    
    // Campo de rol
    const roleSelect = page.locator('[data-testid="signup-role-select"]');
    await expect(roleSelect).toBeVisible();
    await roleSelect.selectOption('Developer');
    
    // Campo de email
    const emailInput = page.locator('[data-testid="signup-email-input"], input[id="email"], #email');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('juan.perez@example.com');
    
    // Campo de contraseña
    const passwordInput = page.locator('[data-testid="signup-password-input"], input[name="password"], #password');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('password123');
    
    // Campo de confirmación de contraseña (si existe)
    const confirmPasswordInput = page.locator('[data-testid="signup-confirm-password-input"], input[name="confirmPassword"], #confirmPassword');
    const confirmPasswordExists = await confirmPasswordInput.isVisible().catch(() => false);
    if (confirmPasswordExists) {
      await confirmPasswordInput.fill('password123');
    }
    
    // 3. Marcar la casilla de términos y condiciones
    const termsCheckbox = page.locator('[data-testid="signup-terms-checkbox"]');
    await expect(termsCheckbox).toBeVisible();
    await termsCheckbox.check();
    
    // 4. Clicar en el botón de registro
    const registerButton = page.locator('[data-testid="signup-submit-button"], button[type="submit"], .signup-button');
    await expect(registerButton).toBeVisible();
    await registerButton.click();
    
    // 5. Verificar que redirecciona al dashboard
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    
    // 6. Confirmar mensaje de bienvenida
    const welcomeMessage = page.locator('text=Welcome, text=Bienvenido, text=¡Bienvenido!, .welcome-message');
    await expect(welcomeMessage.first()).toBeVisible();
    
    console.log('✅ Registro completado exitosamente');
    console.log('✅ Redirección al dashboard correcta');
    console.log('✅ Mensaje de bienvenida mostrado');
  });

});
