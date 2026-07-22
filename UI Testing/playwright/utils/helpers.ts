import testData from '../fixtures/testData.json';

export type UserCredentials = {
  username: string;
  password: string;
};

export type DemoqaTestData = {
  valid_user: UserCredentials;
  invalid_user: UserCredentials;
  existing_keyword: string;
  non_existing_keyword: string;
};

export const loadTestData = (): DemoqaTestData => testData as DemoqaTestData;

export const normalize = (value: string): string => value.trim().toLowerCase();
