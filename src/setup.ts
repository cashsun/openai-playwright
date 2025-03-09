import { test as Base, Page } from "@playwright/test";
import { SetupOptions, setup as setupRunner } from "openai-runner";
import { createActions } from "./createActionsV2";
import { coderSystemPrompt, runnerSystemPrompt, userPrompt } from "./prompts";

/**
 * Setup AI runner (runs playwright code) and AI code suggester (generate playwright code)
 * to be used directly inside your test cases.
 * for example
 * ```javascript
 * import { ai, aiSuggest } from './localSetup.ts';
 *
 * test('page has title', async ()=>{
 *  await ai('page has title "Playwright Test"')
 * })
 * ```
 * @param options configurations for OpenAI-like models
 * @returns ai (runner + code generator), aiSuggest (generate playwright code only). Both resolves to final message from AI model.
 *
 */
export const setup = (options: SetupOptions) => {
  const ai = async (
    task: string,
    { test, page }: { test?: typeof Base; page: Page }
  ) => {
    const run = setupRunner(
      Object.assign(
        {
          systemPrompt: runnerSystemPrompt,
          maxPromptLength: 500_000,
        } as Partial<SetupOptions>,
        options
      ),
      createActions,
      userPrompt
    );

    if (test) {
      test.setTimeout(200_000);
      return await test.step("openai-playwright.run", async () => {
        return await run(task, { test, page });
      });
    } else {
      return await run(task, { test, page });
    }
  };

  const aiSuggest = async (
    task: string,
    { test, page }: { test?: typeof Base; page: Page }
  ) => {
    const run = setupRunner(
      Object.assign(
        {
          systemPrompt: coderSystemPrompt,
          maxPromptLength: 500_000,
        } as Partial<SetupOptions>,
        options
      ),
      undefined,
      userPrompt
    );

    if (test) {
      test.setTimeout(200_000);
      return await test.step("openai-playwright.suggest", async () => {
        return await run(task, { test, page });
      });
    } else {
      return await run(task, { test, page });
    }
  };

  return { ai, aiSuggest };
};
