# 🎭 Tests E2E para Aplicación React

## ⚠️ IMPORTANTE: Proyecto Independiente

Este proyecto de tests **NO arranca la aplicación React**. Es un repositorio completamente separado que ejecuta tests contra una aplicación que ya debe estar corriendo.

## 📋 Requisitos Previos

1. **La aplicación React DEBE estar corriendo en `http://localhost:3000`**
2. Asegúrate de que la aplicación esté completamente cargada antes de ejecutar los tests

## 🚀 Instalación

```bash
npm install
```

## 🧪 Ejecutar Tests

### Tests en modo headless (recomendado para CI)
```bash
npm test
```

### Tests con interfaz gráfica (para desarrollo)
```bash
npm run test:headed
```

### Tests en modo debug
```bash
npm run test:debug
```

### Interfaz interactiva de Playwright
```bash
npm run test:ui
```

### Ver reporte de resultados
```bash
npm run show-report
```

## 📁 Estructura del Proyecto

```
/
├── playwright.config.ts      # Configuración de Playwright (solo Chromium)
├── test-base.ts             # Helper para navegación automática
├── package.json             # Dependencias mínimas necesarias
├── tests/
│   ├── *.spec.ts           # ✅ Tests que SÍ se ejecutan
│   └── disabled/           # 🚫 Tests que NO se ejecutan
└── README.md               # Este archivo
```

## 🔧 Configuración

### Navegador
- Solo se ejecutan tests en **Chromium**
- Otros navegadores están deshabilitados intencionalmente

### URL Base
- Todos los tests apuntan a `http://localhost:3000`
- La aplicación React debe estar corriendo en este puerto

### Tests Deshabilitados
- La carpeta `/tests/disabled/` contiene tests que no se ejecutan
- Útil para guardar tests experimentales o temporalmente deshabilitados

## 📝 Escribir Tests

Todos los tests deben usar el helper `test-base.ts` para navegación automática:

```typescript
import { test, expect } from '../test-base';

test.describe('Mi Test Suite', () => {
  test('debe hacer algo específico', async ({ page }) => {
    // La página ya está en localhost:3000 automáticamente
    // Escribir tu test aquí...
  });
});
```

## 🔄 Flujo de Trabajo Recomendado

1. **Arrancar la aplicación React** (en otro terminal/proyecto):
   ```bash
   cd /ruta/a/tu/aplicacion/react
   npm start
   ```

2. **Verificar que la aplicación esté corriendo** en http://localhost:3000

3. **Ejecutar los tests** (desde este proyecto):
   ```bash
   npm test
   ```

## ❌ Lo que NO hace este proyecto

- ❌ NO arranca la aplicación React
- ❌ NO instala dependencias de la aplicación
- ❌ NO maneja el ciclo de vida de la aplicación
- ❌ NO ejecuta tests en Firefox o Safari

## ✅ Lo que SÍ hace este proyecto

- ✅ Ejecuta tests E2E contra aplicación corriendo
- ✅ Navegación automática a localhost:3000
- ✅ Solo tests en Chromium
- ✅ Carpeta disabled para tests no ejecutables
- ✅ Configuración mínima y limpia
- ✅ Proyecto completamente independiente

## 🐛 Troubleshooting

### Error: "Timeout connecting to localhost:3000"
- **Solución**: Asegúrate de que la aplicación React esté corriendo

### Tests fallan con errores de conexión
- **Solución**: Verifica que http://localhost:3000 responda en tu navegador

### Tests en disabled/ se están ejecutando
- **Solución**: Verifica que estén en la carpeta `/tests/disabled/` exactamente
