import { SetupOptions } from "openai-runner";
import { setup } from "../dist/index.es.js";

const options: SetupOptions = {
  // model: "hermes-3-llama-3.1-8b",
  model: "qwen2.5-7b-instruct-1m",
  // model: "deepseek-r1-distill-llama-8b",
  baseURL: "http://localhost:1234/v1/",
  apiKey: "",
};

const { ai, aiSuggest } = setup(options);

export { ai, aiSuggest };
