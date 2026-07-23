/* Fixture for managing the Playwright page instance across tests. 
 This allows for sharing the same page instance between different test files,
 */
import { Page } from "@playwright/test";

export const pageFixture = {
  //@ts-ignore
  page: undefined as Page,
};
