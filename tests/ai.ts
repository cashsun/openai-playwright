import { setup } from "../dist/index.es.js";
import { Page, test } from "@playwright/test";
import fs from 'fs';
import { SetupOptions } from "../dist/index.d.js";

const options: SetupOptions = {
  // model: "hermes-3-llama-3.1-8b",
  model: "qwen2.5-7b-instruct-1m",
  // model: "deepseek-r1-distill-llama-8b",
  baseURL: "http://localhost:1234/v1/",
  apiKey: ""
};

const { ai, aiSuggest: aiCoder } = setup(options);

const aiSuggest = async (
  task: string,
  context: { test: typeof test | undefined; page: Page }
) => {
  const result = await aiCoder(task, context);
  fs.writeFileSync('../genrated-code.md', result.message)
};

export { ai, aiSuggest };
