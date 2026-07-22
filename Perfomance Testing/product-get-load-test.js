import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import exec from 'k6/execution';

// -----------------------------------------------------------
// Objetivo: GET https://fakestoreapi.com/products/{ID}
// Escenario: ramp-up de 1 usuario/seg hasta 100, sostenido
// 25 min, y ramp-down de 1 usuario/seg hasta 0.
// -----------------------------------------------------------

const BASE_URL = 'https://fakestoreapi.com';

// Fuente externa de datos (data-driven testing).
// SharedArray carga el archivo una sola vez y lo comparte
// entre todos los VUs, en vez de duplicarlo en memoria por cada uno.
const productIds = new SharedArray('product ids', function () {
  return JSON.parse(open('./data/product-ids.json'));
});

export const options = {
  stages: [
    { duration: '100s', target: 100 }, // ramp-up: +1 usuario/seg (100 en 100s)
    { duration: '25m', target: 100 },  // carga sostenida de 100 usuarios
    { duration: '100s', target: 0 },   // ramp-down: -1 usuario/seg (100 a 0 en 100s)
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],   // ajustar según el SLA esperado
    http_req_failed: ['rate<0.01'],     // tasa de errores aceptable
    checks: ['rate>0.99'],              // tasa de éxito de validaciones
  },
};

// Helper local para evitar depender de librerías externas (jslib)
function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  // Startup delay: se ejecuta una sola vez por VU, antes de su primera
  // solicitud. No se repite en iteraciones subsecuentes del mismo VU.
  if (exec.vu.iterationInScenario === 0) {
    sleep(randomIntBetween(4, 8));
  }

  // Selección del ID: se distribuye entre VUs e iteraciones para
  // cubrir los 19 valores de forma repetida a lo largo de la prueba.
  const index = (exec.vu.idInTest + exec.vu.iterationInScenario) % productIds.length;
  const productId = productIds[index];

  const res = http.get(`${BASE_URL}/products/${productId}`, {
    tags: { name: 'GetProductById' }, // agrupa la métrica bajo un solo nombre
  });

  check(res, {
    'status es 200': (r) => r.status === 200,
    'respuesta incluye el id correcto': (r) => {
      const body = r.json();
      return body && body.id === productId;
    },
  });

  sleep(1); // pausa entre iteraciones para simular comportamiento real
}
