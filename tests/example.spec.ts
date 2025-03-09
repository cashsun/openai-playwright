import { test, expect } from "@playwright/test";
import { ai, aiSuggest } from "./ai";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  /*
   * ask ai to generate playwright code. 
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

  await aiSuggest(`click "Get started" button`, { test, page });
  await page.getByRole("link", { name: "Get started" }).click();

  // each ai() takes a snapshot page - a separate call is mandatory when page content updates
  await page.waitForLoadState("load");
  await ai(`expect header "Installation" to be visible`, { test, page });

  // Expects page to have a heading with the name of Installation.
  // await expect(
  //   page.getByRole("heading", { name: "Installation" })
  // ).toBeVisible();
});
