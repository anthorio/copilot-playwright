# Playwright Tests - Configurado para React
## 🏗️ **Estructura del proyecto**

## 🛠️ **Scripts disponibles**

- `npm test` - Ejecutar todos los tests (configurado solo para Chromium)
- `npm run test:headed` - Tests con navegador visible
- `npm run test:debug` - Tests en modo debug
- `npm run test:ui` - Interfaz visual de Playwright
- `npm run show-report` - Ver reporte de resultados

## ✅ **Configuración completada**

- ✅ **Solo Chromium**: Los tests se ejecutan únicamente en Chromium
- ✅ **Navegación automática**: Los tests van automáticamente a localhost:3000 (sin `page.goto()`)
- ✅ **Carpeta disabled**: Tests de ejemplo están en `/tests/disabled/` para no interferir
- ✅ **WebServer listo**: Configurado para iniciar tu React app automáticamente

## 🚀 **Cómo usar con tu proyecto React**

### 1. Descomenta el webServer
En `playwright.config.ts`, descomenta esta sección:
```typescript
webServer: {
  command: 'npm start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
},
```

### 2. Usa la navegación automática
En tus tests, importa desde `test-base.ts`:
```typescript
import { test, expect } from '../test-base'; // 🚀 Navegación automática

test('mi test', async ({ page }) => {
  // ¡Ya estás en localhost:3000! No necesitas page.goto()
  await expect(page.locator('#root')).toBeVisible();
});
```

### 3. O usa el helper normal
Si prefieres el enfoque tradicional:
```typescript
import { test, expect } from '@playwright/test';

test('mi test', async ({ page }) => {
  await page.goto('/'); // Va a localhost:3000 por la baseURL
  await expect(page.locator('#root')).toBeVisible();
});
```

## 📁 **Estructura del proyecto**

```
tests/
├── disabled/           # Tests de ejemplo (no se ejecutan)
│   ├── example.spec.ts        # Tests básicos de Playwright
│   ├── react-tests.spec.ts    # Tests para React con navegación automática
│   └── auto-navigation.spec.ts # Demos de navegación automática
├── setup-ready.spec.ts      # Test que confirma que todo está listo
test-base.ts           # Helper para navegación automática
playwright.config.ts   # Configuración (solo Chromium, baseURL, webServer)
```


## 🎯 **Próximos pasos**

1. **Copia este proyecto** a la carpeta de tu proyecto React
2. **Descomenta webServer** en `playwright.config.ts`
3. **Mueve tests** de `/disabled/` a `/tests/` los que necesites
4. **Crea tus propios tests** usando los ejemplos como base
5. **Ejecuta** `npm test` y ¡listo!

## 💡 **Consejos para React**

- Usa `data-testid` en tus componentes para testing robusto
- Los tests esperan automáticamente a `networkidle` 
- Puedes usar `page.getByRole()`, `page.getByTestId()`, etc.
- La configuración ya maneja la carga de React automáticamente
