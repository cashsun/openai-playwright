import { SetupOptions as RunnerOptions } from 'openai-runner';

/**
 * timeout?: number; override test timeout in milliseconds. default 200 seconds
 * 
 * maxPromptLength?: number; defaults to 500,000 characters ~ 100,000 tokens
 * 
 * systemPrompt?: string; override build-in playwright system prompt with your own
 * 
 * model?: string;
 * 
 * ...openai.ClientOptions
 * 
 */
export type SetupOptions = RunnerOptions & {
    /** override test timeout in milliseconds. default 200 seconds */ 
    timeout?: number
}