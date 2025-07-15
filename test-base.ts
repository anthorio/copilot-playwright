import { test as base, expect } from '@playwright/test';

/**
 * Helper para tests de aplicación React
 * 
 * ✅ Automáticamente navega a http://localhost:3000 antes de cada test
 * ✅ Espera a que la página cargue completamente
 * ⚠️  Requiere que la aplicación React esté corriendo ANTES de ejecutar los tests
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Automáticamente ir a la aplicación React en localhost:3000
    await page.goto('/');
    
    // Esperar a que la página cargue completamente antes de continuar
    await page.waitForLoadState('networkidle');
    
    // Usar la página configurada en el test
    await use(page);
  },
});

export { expect };
