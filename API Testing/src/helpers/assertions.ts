import { expect, APIResponse } from '@playwright/test';

export async function expectStatus(response: APIResponse, expectedStatus: number) {
  expect(response.status()).toBe(expectedStatus);
}

export async function expectResponseTimeLessThan(startTime: number, maxMs: number) {
  const duration = Date.now() - startTime;
  expect(duration).toBeLessThan(maxMs);
}

export async function expectJsonKeys(
  body: Record<string, unknown> | Record<string, unknown>[],
  expectedKeys: string[]
) {
  const target = Array.isArray(body) ? body[0] : body;
  expect(target).toBeTruthy();
  expect(Object.keys(target).sort()).toEqual(expectedKeys.sort());
}
