# Performance Test — GET /products/{id} (FakeStoreAPI)

## Descripción

Prueba de performance sobre el endpoint `GET https://fakestoreapi.com/products/{ID}`, diseñada para evaluar el comportamiento del servicio bajo una carga creciente, sostenida y decreciente, usando datos de prueba dinámicos.

## Estructura del proyecto

```
Performance Testing/
├── product-get-load-test.js   # Script principal de k6
├── data/
│   └── product-ids.json       # IDs de producto (1 al 19), fuente externa de datos
├── results/                   # Salida de las ejecuciones (se genera al correr la prueba)
└── README.md
```

## Prerrequisitos

k6 no es una dependencia de npm, se instala como binario del sistema:

```bash
# Mac
brew install k6

# Windows
choco install k6

# Linux (Debian/Ubuntu)
sudo apt install k6

# Docker (alternativa sin instalación local)
docker run -i grafana/k6 run - <product-get-load-test.js
```

Más detalles en la [documentación oficial de instalación](https://k6.io/docs/get-started/installation/).

## Cómo ejecutar la prueba

Desde la carpeta `Performance Testing`:

```bash
k6 run product-get-load-test.js
```

Para exportar resultados y poder generar el reporte con gráficas:

```bash
k6 run --summary-export=results/summary.json --out json=results/results.json product-get-load-test.js
```

- `summary.json` — resumen final de métricas (promedios, percentiles, thresholds pass/fail).
- `results.json` — datos punto por punto de cada request, útil para graficar la evolución en el tiempo (por ejemplo con Python/pandas/matplotlib, Excel, o importándolo a Grafana).

## Diseño del escenario

| Etapa | Duración | Comportamiento |
|---|---|---|
| Ramp-up | 100s | De 0 a 100 usuarios virtuales, a razón de ~1 usuario/segundo |
| Sostenido | 25 min | Se mantiene la carga fija en 100 usuarios |
| Ramp-down | 100s | De 100 a 0 usuarios, a razón de ~1 usuario menos/segundo |

**Decisiones técnicas:**

- **Duración de los stages en vez de tasa explícita**: k6 incrementa/decrementa VUs de forma lineal a lo largo de la duración de un stage. Definir `{ duration: '100s', target: 100 }` logra matemáticamente el mismo resultado que "1 usuario por segundo durante 100 segundos", sin necesidad de una API distinta.
- **Startup delay (sleep aleatorio 4-8s) solo en la primera iteración de cada VU**: se usa `exec.vu.iterationInScenario === 0` para detectar la primera ejecución de cada usuario virtual. Esto evita que el delay se repita en cada iteración subsecuente del mismo VU, que sería el comportamiento por defecto si el sleep estuviera al inicio del bloque `default()` sin esa validación.
- **Datos externos vía `SharedArray`**: el archivo `product-ids.json` se carga una sola vez en memoria y se comparte entre todos los VUs, en vez de duplicarse por cada uno. Es la práctica recomendada por k6 para datasets que no cambian durante la ejecución.
- **Selección de ID combinando `idInTest` + número de iteración**: distribuye la cobertura de los 19 IDs entre los distintos VUs e iteraciones a lo largo de toda la prueba, en vez de que todos los usuarios virtuales pidan siempre el mismo producto.
- **Tag `name: 'GetProductById'` en la request**: agrupa la métrica bajo un nombre fijo aunque la URL cambie dinámicamente por el `{ID}`, evitando que k6 trate cada ID como un endpoint distinto en las métricas.

## Criterios de éxito (thresholds)

| Métrica | Umbral | Justificación |
|---|---|---|
| `http_req_duration` | p(95) < 800ms | El 95% de las respuestas debe completarse en menos de 800ms; ajustar según el SLA real del servicio si se conoce. |
| `http_req_failed` | rate < 1% | Tolerancia baja de errores de red/servidor bajo carga. |
| `checks` | rate > 99% | Las validaciones funcionales (status 200, ID correcto en la respuesta) deben cumplirse casi siempre, incluso bajo estrés. |

## Métricas clave a analizar

- **Tiempos de respuesta** — promedio, p90, p95, p99 (`http_req_duration`).
- **Tasa de éxito/error** — `checks` y `http_req_failed`.
- **Throughput** — requests por segundo (`http_reqs`), capturado automáticamente por k6.
- **Comportamiento por etapa** — comparar métricas durante ramp-up, sostenido y ramp-down para identificar si la degradación ocurre al alcanzar el pico de carga o se mantiene estable.

## Análisis de resultados

*Completar tras ejecutar la prueba.*

| Métrica | Umbral esperado | Valor obtenido | ¿Cumple? |
|---|---|---|---|
| p95 response time | < 800ms | — | — |
| Error rate | < 1% | — | — |
| Throughput promedio | — | — | — |
| Checks exitosos | > 99% | — | — |

## Cuellos de botella identificados

*Completar tras el análisis de resultados (por ejemplo: degradación de tiempos de respuesta al superar cierto número de VUs, aumento de errores en el pico de carga, etc.).*

## Recomendaciones de mejora

*Completar en base a los hallazgos (por ejemplo: caching, escalamiento horizontal, optimización de queries, ajuste de timeouts, etc.).*

## Conclusiones

*Completar con un resumen general: si el servicio soportó la carga esperada, en qué punto se degradó si aplica, y la recomendación final.*
