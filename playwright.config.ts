import { defineConfig, devices } from '@playwright/test';

/**
 * CONFIGURACIÓN PLAYWRIGHT - PROYECTO DE TESTS INDEPENDIENTE
 * 
 * ⚠️  IMPORTANTE: Este proyecto NO arranca la aplicación React.
 * ⚠️  La aplicación debe estar corriendo en http://localhost:3000 ANTES de ejecutar los tests.
 * 
 * Este es un proyecto de tests completamente separado del proyecto de la aplicación.
 */
export default defineConfig({
  testDir: './tests',
  testIgnore: '**/disabled/**', // 🚫 Ignorar la carpeta disabled - tests que no se ejecutan
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL apunta a la aplicación React que DEBE estar corriendo */
    baseURL: 'http://localhost:3000', // � LA APLICACIÓN DEBE ESTAR CORRIENDO EN ESTE PUERTO

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // ✅ Solo se ejecutan tests en Chromium
    // Otros navegadores están comentados intencionalmente
  ],

  /* 
   * ❌ NO SE USA webServer - La aplicación React debe estar corriendo independientemente
   * ❌ Este proyecto de tests NUNCA arranca la aplicación
   * 
   * Para arrancar tu aplicación React, usa:
   * cd /ruta/a/tu/aplicacion/react
   * npm start
   * 
   * LUEGO ejecuta los tests desde este proyecto:
   * npm test
   */
});
