# Books Automation Challenge

## Visión general
Este repositorio funciona como punto de entrada al desafío de BanReservas para la posición de QA de Automatización. Agrupa varias carpetas que contienen diferentes tipos de pruebas automatizadas para validar el comportamiento del sitio demo QA y del ecosistema asociado al desafío.

El objetivo general del proyecto es demostrar una estructura organizada de automatización para cubrir:
- pruebas de interfaz de usuario,
- pruebas de API,
- pruebas de rendimiento.

## Qué se hizo
El repositorio está preparado para mostrar una base de automatización del desafío, con suites separadas por tipo de prueba y con una estructura clara para facilitar la navegación y el mantenimiento.

La cobertura del desafío incluye escenarios como:
- validación de login con credenciales válidas e inválidas,
- búsqueda por palabras clave existentes y no existentes,
- evaluación de viabilidad para automatizar la funcionalidad de "New User".

## Cómo está organizado
El repositorio presenta la siguiente estructura principal:

- [UI Testing](UI%20Testing): carpeta dedicada a pruebas de interfaz de usuario.
  - README: [UI Testing/playwright/README.md](UI%20Testing/playwright/README.md)
- [API Testing](API%20Testing): carpeta dedicada a pruebas de API.
  - README: [API Testing/README.md](API%20Testing/README.md)
- [Perfomance Testing](Perfomance%20Testing): carpeta dedicada a pruebas de rendimiento.
  - README: [Perfomance Testing/README.md](Perfomance%20Testing/README.md)

## Qué representa cada tipo de prueba
- UI Testing: valida flujos del usuario en la interfaz, como login, búsqueda y navegación.
- API Testing: valida endpoints y respuestas del servicio, incluyendo comportamiento esperado ante datos válidos e inválidos.
- Perfomance Testing: valida la estabilidad y comportamiento del sistema bajo carga y con múltiples peticiones.

## Primeros pasos
Para una guía detallada de instalación y ejecución, consultar el README correspondiente de cada carpeta:
- [UI Testing/playwright/README.md](UI%20Testing/playwright/README.md)
- [API Testing/README.md](API%20Testing/README.md)
- [Perfomance Testing/README.md](Perfomance%20Testing/README.md)

## Integración futura en CI
Este repositorio también podría integrarse a un flujo de integración continua usando el pipeline definido en [azure-pipelines.yml](azure-pipelines.yml). Una implementación futura podría incluir:
- ejecución automática de las suites de UI y API en cada cambio relevante,
- publicación de reportes de ejecución como artefactos,
- separación por tipo de prueba para facilitar la trazabilidad de fallos.

