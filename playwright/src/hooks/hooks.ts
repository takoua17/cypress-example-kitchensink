import {
  After,
  Before,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "../support/pageFixture";
import "dotenv/config";

let browser: Browser;
let context: BrowserContext;

//
setDefaultTimeout(30_000); // Set default timeout for Cucumber steps to 30 seconds
// avoiding false failures on slower steps

// execute before all tests to launch the browser
BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

//Run before each scenario to create a new browser context and page instance
Before(async function () {
  context = await browser.newContext({
    // create a new context for each test
    baseURL: process.env.BASE_URL, //read from .env
  });
  pageFixture.page = await context.newPage(); // store the page in pageFixture object
  // that can be accessed in step definitions files
});

// Run after each scenario to close the page and context, and capture a screenshot if the scenario fails
After(async function ({ result, pickle }) {
  // Capture a screenshot only when the scenario fails
  if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./rapports/screenshot/${pickle.name}.png`, // save the screenshot with the scenario name in rapports/screenshot folder
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
