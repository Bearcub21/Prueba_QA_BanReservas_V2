# API Library Automation - Playwright

## Objetivo
Automatizar pruebas funcionales e integrales para el servicio REST:
https://rahulshettyacademy.com/Library

## Stack
- Playwright
- TypeScript
- Zod para validación básica de schema

## Endpoints cubiertos
- POST /Addbook.php
- GET /GetBook.php
- POST /DeleteBook.php

## Cobertura
### Funcionales
#### Agregar libro exitosamente
- Validar status code
- Validar estructura del JSON
- Validar tiempo de respuesta < 500 ms
- Validar que el ID sea isbn + aisle
- Validar error al enviar aisle inválido

#### Obtener libro existente
- Validar status code
- Validar estructura del JSON
- Validar tiempo de respuesta < 500 ms
- Validar error para libro inexistente

#### Eliminar libro existente
- Validar status code
- Validar estructura del JSON
- Validar tiempo de respuesta < 500 ms
- Validar error al eliminar libro inexistente

### Integrales
- Crear 2 libros
- Consultar 2 libros
- Eliminar 2 libros
- Confirmar que ya no existen

