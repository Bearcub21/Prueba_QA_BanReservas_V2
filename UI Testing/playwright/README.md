# Automatización con Playwright de DemoQA Books

Esta carpeta contiene un framework de automatización basado en TypeScript y Playwright para el sitio web DemoQA Books.

## Estructura del proyecto

- `features/`: archivos de características estilo BDD que documentan los mismos escenarios de prueba.
- `pages/`: clases del patrón Page Object Model.
- `tests/`: especificaciones de pruebas de Playwright.
- `fixtures/`: datos de prueba externos.
- `utils/`: utilidades compartidas y constantes de entorno.
- `playwright.config.ts`: configuración del runner de Playwright.

## Configuración

```bash
cd "UI Testing/playwright"
npm install
npm run install:browsers
```

## Ejecutar pruebas

```bash
npm test
```

## Comandos adicionales

- `npm run test:headed` — ejecutar las pruebas con la interfaz visual del navegador.
- `npm run test:report` — abrir el reporte HTML de Playwright.
  
## Notas

- El framework está limitado a Chromium. Puede extenderse si se desea a los demas navegadores disponibles en Playwright. 
- Los archivos BDD se conservan como documentación mientras las pruebas de Playwright implementan los flujos automatizados.
