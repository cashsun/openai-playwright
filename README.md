# openai-playwright

A Playwright automation tool supports openai-like models using [Function Calling](https://platform.openai.com/docs/guides/function-calling) API.

Support Typescript out of box.

Inspired by [ZeroStep](https://github.com/zerostep-ai/zerostep) & [auto-playwright](https://github.com/lucgagan/auto-playwright)

## Simple Use Case

```javascript
// ai.ts
import { SetupOptions } from "openai-runner";
import { setup } from "../dist/index.es.js";

const options: SetupOptions = {
  // a 70b+ model is strongly recommended for testing reliability
  model: "qwen2.5-7b-instruct-1m",
  baseURL: "http://localhost:1234/v1/",
  apiKey: "",
};

const { ai, aiSuggest } = setup(options);

export { ai, aiSuggest };
```

```javascript
// test file
import { test, expect } from "@playwright/test";
import { ai, aiSuggest } from "./ai";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  /*
   * ask ai to generate playwright code. Please note: code is also returned from ai()
   * therefore there's no need to run both.
   * useful when you have a flaky test
   **/
  // await aiSuggest(`expect page title to include "Playwright"`, { test, page });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  // or use AI to run the same
  // await ai(`expect page title to include "Playwright"`, { test, page });
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // await page.getByRole("link", { name: "Get started" }).click();
  await ai(`click "Get started" button`, { test, page });


  await page.waitForLoadState("load");
  // each ai() takes a page snapshot, therefore a separate call is mandatory when page content updates
  await ai(`expect header "Installation" to be visible`, { test, page });

  // the above should achieve the same as below
  // await expect(
  //   page.getByRole("heading", { name: "Installation" })
  // ).toBeVisible();
});

```

## Installation

### using npm

```shell
npm i openai-playwright
```

### using pnpm

```shell
pnpm add openai-playwright
```
