import { test, expect } from '../../test-base';

test.describe('Verificación de Aplicación React', () => {
  test('debe conectarse a la aplicación React en localhost:3000', async ({ page }) => { 
    // ✅ Verificar que estamos en la URL correcta (automático con test-base.ts)
    expect(page.url()).toBe('http://localhost:3000/');
    
    // ✅ Verificar que la página responde
    const title = await page.title();
    expect(title).toBeTruthy(); // Debe tener algún título
    
    // ✅ Verificar que no hay errores de conexión
    const isConnected = await page.isVisible('body');
    expect(isConnected).toBe(true);
    
    console.log('✅ Aplicación React conectada correctamente');
    console.log('📄 Título de la página:', title);
  }); 
 
}); 