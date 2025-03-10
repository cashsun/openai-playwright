import { test as Base, Page } from "@playwright/test";
import { setup as setupRunner } from "openai-runner";
import { createActions } from "./createActionsV2";
import { coderSystemPrompt, runnerSystemPrompt, userPrompt } from "./prompts";
import { SetupOptions } from "./types/setup";

type AIRunner = (
  task: string,
  { test, page }: { test?: typeof Base; page: Page }
) => Promise<{ message: string }>;

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

  const suggest = setupRunner(
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

  const ai: AIRunner = async (task, { test, page }) => {
    if (test) {
      test.setTimeout(options.timeout ?? 200_000);
      return await test.step("openai-playwright.run", async () => {
        return await run(task, { test, page });
      });
    } else {
      return await run(task, { test, page });
    }
  };

  const aiSuggest: AIRunner = async (task, { test, page }) => {
    if (test) {
      test.setTimeout(options.timeout ?? 200_000);
      return await test.step("openai-playwright.suggest", async () => {
        return await suggest(task, { test, page });
      });
    } else {
      return await suggest(task, { test, page });
    }
  };

  return { ai, aiSuggest };
};
