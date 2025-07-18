import { test, expect } from '../test-base';

test.describe('Test de Navegación Móvil - Menú Hamburguesa', () => {
  test('debe funcionar correctamente el menú hamburguesa en vista móvil', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Cambiar la vista a móvil
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE dimensions
    
    // Verificar que estamos en la página principal
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // 2. Verificar que aparece el botón de menú hamburguesa
    const hamburgerButton = page.locator('.nav-menu active, .menu-toggle, .navbar-toggle, button[aria-label="Menu"], .mobile-menu-button, [data-testid="mobile-menu-toggle"]');
    await expect(hamburgerButton.first()).toBeVisible();
    
    console.log('✅ Botón de menú hamburguesa visible en vista móvil');
    
    // 3. Clicar en el botón hamburguesa
    await hamburgerButton.first().click();
    
    // 4. Confirmar que se despliega el menú móvil
    const mobileMenu = page.locator('.nav-menu.active');
    await expect(mobileMenu.first()).toBeVisible();
    
    // Verificar que los enlaces del menú móvil están visibles
    const mobileHomeLink = page.locator('[data-testid="nav-home-link"]');
    const mobileServicesLink = page.locator('[data-testid="nav-services-link"]');
    const mobileProductsLink = page.locator('[data-testid="nav-products-link"]');
    
    await expect(mobileHomeLink.first()).toBeVisible();
    await expect(mobileServicesLink.first()).toBeVisible();
    await expect(mobileProductsLink.first()).toBeVisible();
    
    console.log('✅ Menú móvil desplegado correctamente con todos los enlaces visibles');
    
    // 5. Hacer clic en un enlace del menú móvil (Services)
    await mobileServicesLink.first().click();
    
    // 6. Verificar la navegación correcta
    await expect(page).toHaveURL(/\/services|#services/);
    console.log('✅ Navegación desde menú móvil exitosa');
    
    // 7. Verificar que el menú se cierra después del clic
    // El menú debería cerrarse automáticamente, verificamos que ya no está visible
    await expect(mobileMenu.first()).not.toBeVisible();
    
    console.log('✅ Menú móvil se cierra correctamente después de la navegación');
    
    // 8. Verificaciones adicionales
    // Verificar que estamos en la página correcta con contenido específico
    const servicesContent = page.locator('h1:has-text("Services"), h2:has-text("Services"), .services-section, #services');
    await expect(servicesContent.first()).toBeVisible();
    
    // 9. Probar abrir el menú nuevamente para confirmar funcionalidad repetible
    await hamburgerButton.first().click();
    await expect(mobileMenu.first()).toBeVisible();
    
    // Hacer clic en otro enlace (Home) para completar el test
    const mobileHomeLink2 = page.locator('[data-testid="nav-home-link"]');
    await mobileHomeLink2.first().click();
    
    // Verificar navegación a Home y cierre del menú
    await expect(page).toHaveURL(/\/$|\/home|#home/);
    await expect(mobileMenu.first()).not.toBeVisible();
    
    console.log('✅ Funcionalidad del menú hamburguesa completamente verificada');
    console.log('✅ Navegación móvil funciona correctamente');
    console.log('✅ Menú se abre y cierra apropiadamente');
  });

});
