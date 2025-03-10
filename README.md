# openai-playwright

A Playwright automation tool supports openai-like models using [Function Calling](https://platform.openai.com/docs/guides/function-calling) API.

Supports Typescript out of box.

Inspired by [ZeroStep](https://github.com/zerostep-ai/zerostep) & [auto-playwright](https://github.com/lucgagan/auto-playwright)

The driving principal of this library and included prompts is to steer AI to create select-as-seen type of CSS selectors that's more robust than selectors based on class names / attributes / test IDs

For example, AI should in favour of
`await page.locator('div:text("Get started")').click()`
versus 
`await page.locator('div.my-own-class').click()`

## How to use

```javascript
// ai.ts
import { setup, SetupOptions } from "openai-playwright";

const options: SetupOptions = {
  // a 70b+ model is strongly recommended for testing reliability
  model: "qwen2.5-7b-instruct-1m",
  baseURL: "http://localhost:1234/v1/",
  apiKey: "",
};

/**
 * SetupOptions:
 * 
 * timeout?: number; override test timeout in milliseconds. default 200 seconds
 * maxPromptLength?: number; defaults to 500,000 characters ~ 100,000 tokens
 * systemPrompt?: string; override build-in playwright system prompt with your own
 * model?: string;
 * ...openai.ClientOptions
 * 
 */
const { ai, aiSuggest } = setup(options);

const { ai, aiSuggest: aiCoder } = setup(options);

// customise AI features before exporting, e.g. save generated code into a file.
const aiSuggest = async (
  task: string,
  context: { test: typeof test | undefined; page: Page }
) => {
  const result = await aiCoder(task, context);
  fs.writeFileSync('../genrated-code.md', result.message)
};

export { ai, aiSuggest };
```

```javascript
// test file
import { test, expect } from "@playwright/test";
import { ai, aiSuggest } from "./ai";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  /*
   * ask ai to generate playwright code.
   * useful when you have a flaky test.
   **/
  // await aiSuggest(`expect page title to include "Playwright"`, { test, page });

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  // or use AI to run the same
  // await ai(`expect page title to include "Playwright"`, { test, page });
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await ai(`click "Get started" button`, { test, page });
  // await page.getByRole("link", { name: "Get started" }).click();

  await page.waitForLoadState("load");
  // each ai() takes a page snapshot, therefore a separate call is mandatory when page content updates
  await aiSuggest(`expect "How to install Playwright" link to be visible`, { test, page });

});

```

## Installation

### using npm

```shell
npm i openai-playwright -D
```

### using pnpm

```shell
pnpm add openai-playwright -D
```
