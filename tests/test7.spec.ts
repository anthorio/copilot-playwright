import { test, expect } from '../test-base';

test.describe('Test de Navegación - Verificación de Enlaces del Menú', () => {
  test('debe navegar correctamente a través de los enlaces del menú principal', async ({ page }) => {
    // ✅ Ya estamos en localhost:3000 gracias a test-base.ts
    
    // 1. Verificar que estamos en la página principal
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // 2. Verificar que todos los enlaces del menú están visibles
    const homeLink = page.locator('a[href="/"], a[href="#home"], nav a:has-text("Home")');
    const servicesLink = page.locator('a[href="/services"], a[href="#services"], nav a:has-text("Services")');
    const productsLink = page.locator('a[href="/products"], a[href="#products"], nav a:has-text("Products")');
    
    await expect(homeLink.first()).toBeVisible();
    await expect(servicesLink.first()).toBeVisible();
    await expect(productsLink.first()).toBeVisible();
    
    console.log('✅ Todos los enlaces del menú están visibles');
    
    // 3. Clicar en el enlace "Services" y verificar navegación
    await servicesLink.first().click();
    
    // Verificar que la URL cambia apropiadamente para Services
    await expect(page).toHaveURL(/\/services|#services/);
    console.log('✅ Navegación a Services exitosa');
    
    // Esperar un momento para que la página cargue completamente
    await page.waitForLoadState('networkidle');
    
    // 4. Navegar de vuelta a Home y verificar
    await homeLink.first().click();
    
    // Verificar que volvemos a la página principal
    await expect(page).toHaveURL(/\/$|\/home|#home/);
    console.log('✅ Navegación a Home exitosa');
    
    // Esperar un momento para que la página cargue completamente
    await page.waitForLoadState('networkidle');
    
    // 5. Clicar en el enlace "Products" y verificar navegación
    await productsLink.first().click();
    
    // Verificar que la URL cambia apropiadamente para Products
    await expect(page).toHaveURL(/\/products|#products/);
    console.log('✅ Navegación a Products exitosa');
    
    // 6. Verificaciones adicionales - confirmar que cada página tiene contenido específico
    // Verificar que estamos en la página de productos
    const productContent = page.locator('h1:has-text("Products"), h2:has-text("Products"), .products-section, #products');
    await expect(productContent.first()).toBeVisible();
    
    // 7. Volver a Home una vez más para completar el ciclo de navegación
    await homeLink.first().click();
    await expect(page).toHaveURL(/\/$|\/home|#home/);
    
    // Verificar que el contenido de la página principal es visible
    const homeContent = page.locator('h1, .hero-section, .main-content, #home');
    await expect(homeContent.first()).toBeVisible();
    
    console.log('✅ Todas las navegaciones completadas exitosamente');
    console.log('✅ URLs cambian apropiadamente para cada enlace');
    console.log('✅ Contenido específico visible en cada página');
  });

});
