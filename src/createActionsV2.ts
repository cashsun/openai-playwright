import { Page } from "@playwright/test";
import { CreateActions } from "openai-runner";
import { z } from "zod";

export const createActions: CreateActions = ({ page }: { page: Page }) => {
  const findElement = (cssSelector: string) => page.locator(cssSelector);

  return {
    locator_pressKey: {
      fn: async (args: { cssSelector: string; key: string }) => {
        const { cssSelector, key } = args;
        await findElement(cssSelector).press(key);
        return { success: true };
      },
      name: "locator_pressKey",
      description: "Presses a key while focused on the specified element.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
            key: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
            description:
              "CSS selector to find the unique target element for action",
          },
          key: {
            type: "string",
            description:
              "The name of the key to press, e.g., 'Enter', 'ArrowUp', 'a'.",
          },
        },
      },
    },
    page_getTitle: {
      fn: async () => {
        return await page.title();
      },
      name: "page_getTitle",
      description: "Get page title text.",
    },
    page_pressKey: {
      fn: async (args: { key: string }) => {
        const { key } = args;
        await page.keyboard.press(key);
        return { success: true };
      },
      name: "page_pressKey",
      description: "Presses a key globally on the page.",
      parse: (args: string) => {
        return z
          .object({
            key: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          key: {
            type: "string",
            description:
              "The name of the key to press, e.g., 'Enter', 'ArrowDown', 'b'.",
          },
        },
      },
    },
    move_mouse: {
      fn: async (args: { x: number; y: number }) => {
        const { x, y } = args;
        await page.mouse.move(x, y);
        return { success: true };
      },
      name: "move_mouse",
      parse: (args: string) => {
        return z
          .object({
            x: z.coerce.number(),
            y: z.coerce.number(),
          })
          .parse(JSON.parse(args));
      },
      description:
        "move mouse by given specified pixel value on x and y axises",
      parameters: {
        type: "object",
        properties: {
          x: {
            type: "number",
            description: "number of pixels to move the mouse along the x axis.",
          },
          y: {
            type: "number",
            description: "number of pixels to move the mouse along the y axis.",
          },
        },
      },
    },
    locator_evaluate: {
      fn: async (args: { pageFunction: string; cssSelector: string }) => {
        return {
          result: await findElement(args.cssSelector).evaluate(
            args.pageFunction
          ),
        };
      },
      description:
        "Execute JavaScript code in the page, taking the matching element as an argument.",
      name: "locator_evaluate",
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
            description:
              "CSS selector to find the unique target element for action",
          },
          pageFunction: {
            type: "string",
            description:
              "Function to be evaluated in the page context, e.g. node => node.innerText",
          },
        },
      },
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
            pageFunction: z.string(),
          })
          .parse(JSON.parse(args));
      },
    },
    locator_getAttribute: {
      fn: async (args: { attributeName: string; cssSelector: string }) => {
        return {
          attributeValue: await findElement(args.cssSelector).getAttribute(
            args.attributeName
          ),
        };
      },
      name: "locator_getAttribute",
      description: "Returns the matching element's attribute value.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
            attributeName: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          attributeName: {
            type: "string",
          },
          cssSelector: {
            type: "string",
            description:
              "CSS selector to find the unique target element for action",
          },
        },
      },
    },
    locator_innerHTML: {
      fn: async (args: { cssSelector: string }) => {
        return { innerHTML: await findElement(args.cssSelector).innerHTML() };
      },
      name: "locator_innerHTML",
      description: "Returns the element.innerHTML.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: { type: "string" },
        },
      },
    },
    locator_innerText: {
      fn: async (args: { cssSelector: string }) => {
        return { innerText: await findElement(args.cssSelector).innerText() };
      },
      name: "locator_innerText",
      description: "Returns the element.innerText.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_textContent: {
      fn: async (args: { cssSelector: string }) => {
        return {
          textContent: await findElement(args.cssSelector).textContent(),
        };
      },
      name: "locator_textContent",
      description: "Returns the node.textContent.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_inputValue: {
      fn: async (args: { cssSelector: string }) => {
        return {
          inputValue: await findElement(args.cssSelector).inputValue(),
        };
      },
      name: "locator_inputValue",
      description:
        "Returns input.value for the selected <input> or <textarea> or <select> element.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_blur: {
      fn: async (args: { cssSelector: string }) => {
        await findElement(args.cssSelector).blur();

        return { success: true };
      },
      name: "locator_blur",
      description: "Removes keyboard focus from the current element.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_boundingBox: {
      fn: async (args: { cssSelector: string }) => {
        return await findElement(args.cssSelector).boundingBox();
      },
      name: "locator_boundingBox",
      description:
        "This method returns the bounding box of the element matching the locator, or null if the element is not visible. The bounding box is calculated relative to the main frame viewport - which is usually the same as the browser window. The returned object has x, y, width, and height properties.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_check: {
      fn: async (args: { cssSelector: string }) => {
        await findElement(args.cssSelector).check();

        return { success: true };
      },
      name: "locator_check",
      description: "Ensure that checkbox or radio element is checked.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_uncheck: {
      fn: async (args: { cssSelector: string }) => {
        await findElement(args.cssSelector).uncheck();

        return { success: true };
      },
      name: "locator_uncheck",
      description: "Ensure that checkbox or radio element is unchecked.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_isChecked: {
      fn: async (args: { cssSelector: string }) => {
        return { isChecked: await findElement(args.cssSelector).isChecked() };
      },
      name: "locator_isChecked",
      description: "Returns whether the element is checked.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_isEditable: {
      fn: async (args: { cssSelector: string }) => {
        return {
          isEditable: await findElement(args.cssSelector).isEditable(),
        };
      },
      name: "locator_isEditable",
      description:
        "Returns whether the element is editable. Element is considered editable when it is enabled and does not have readonly property set.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_isEnabled: {
      fn: async (args: { cssSelector: string }) => {
        return { isEnabled: await findElement(args.cssSelector).isEnabled() };
      },
      name: "locator_isEnabled",
      description:
        "Returns whether the element is enabled. Element is considered enabled unless it is a <button>, <select>, <input> or <textarea> with a disabled property.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_isVisible: {
      fn: async (args: { cssSelector: string }) => {
        return { isVisible: await findElement(args.cssSelector).isVisible() };
      },
      name: "locator_isVisible",
      description: "Returns whether the element is visible.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_clear: {
      fn: async (args: { cssSelector: string }) => {
        await findElement(args.cssSelector).clear();

        return { success: true };
      },
      name: "locator_clear",
      description: "Clear the input field.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_click: {
      fn: async (args: { cssSelector: string }) => {
        await findElement(args.cssSelector).click();

        return { success: true };
      },
      name: "locator_click",
      description: "Click an element found by given css selector.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_count: {
      fn: async (args: { cssSelector: string }) => {
        return { elementCount: await findElement(args.cssSelector).count() };
      },
      name: "locator_count",
      description: "Returns the number of elements matching the locator.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    locator_fill: {
      fn: async (args: { value: string; cssSelector: string }) => {
        await findElement(args.cssSelector).fill(args.value);

        return {
          success: true,
        };
      },
      name: "locator_fill",
      description: "Set a value to the input field.",
      parse: (args: string) => {
        return z
          .object({
            cssSelector: z.string(),
            value: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
          cssSelector: {
            type: "string",
          },
        },
      },
    },
    page_goto: {
      fn: async (args: { url: string }) => {
        return {
          url: await page.goto(args.url),
        };
      },
      name: "page_goto",
      description: "Set a value to the input field.",
      parse: (args: string) => {
        return z
          .object({
            cssLocator: z.string(),
            value: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          value: {
            type: "string",
          },
          cssLocator: {
            type: "string",
          },
        },
      },
    },
    expect_toBe: {
      fn: (args: { actual: string; expected: string }) => {
        return {
          actual: args.actual,
          expected: args.expected,
          success: args.actual === args.expected,
        };
      },
      name: "expect_toBe",
      description:
        "Asserts that the actual value is equal to the expected value.",
      parse: (args: string) => {
        return z
          .object({
            actual: z.string(),
            expected: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          actual: {
            type: "string",
          },
          expected: {
            type: "string",
          },
        },
      },
    },
    expect_notToBe: {
      fn: (args: { actual: string; expected: string }) => {
        return {
          actual: args.actual,
          expected: args.expected,
          success: args.actual !== args.expected,
        };
      },
      name: "expect_notToBe",
      description:
        "Asserts that the actual value is not equal to the expected value.",
      parse: (args: string) => {
        return z
          .object({
            actual: z.string(),
            expected: z.string(),
          })
          .parse(JSON.parse(args));
      },
      parameters: {
        type: "object",
        properties: {
          actual: {
            type: "string",
          },
          expected: {
            type: "string",
          },
        },
      },
    },
    resultAssertion: {
      fn: (args: { assertion: boolean }) => {
        return args;
      },
      parse: (args: string) => {
        return z
          .object({
            assertion: z.boolean(),
          })
          .parse(JSON.parse(args));
      },
      description:
        "This function is called when the initial instructions asked to assert something; then 'assertion' is either true or false (boolean) depending on whether the assertion succeeded.",
      name: "resultAssertion",
      parameters: {
        type: "object",
        properties: {
          assertion: {
            type: "boolean",
          },
        },
      },
    },
    resultQuery: {
      fn: (args: { assertion: boolean }) => {
        return args;
      },
      parse: (args: string) => {
        return z
          .object({
            query: z.string(),
          })
          .parse(JSON.parse(args));
      },
      description:
        "This function is called at the end when the initial instructions asked to extract data; then 'query' property is set to a text value of the extracted data.",
      name: "resultQuery",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
          },
        },
      },
    },
    resultAction: {
      fn: () => {
        return null;
      },
      parse: (args: string) => {
        return z.object({}).parse(JSON.parse(args));
      },
      description:
        "This function is called at the end when the initial instructions asked to perform an action.",
      name: "resultAction",
      parameters: {
        type: "object",
        properties: {},
      },
    },
    resultError: {
      fn: (args: { errorMessage: string }) => {
        return {
          errorMessage: args.errorMessage,
        };
      },
      parse: (args: string) => {
        return z
          .object({
            errorMessage: z.string(),
          })
          .parse(JSON.parse(args));
      },
      description:
        "If user instructions cannot be completed, then this function is used to produce the final response.",
      name: "resultError",
      parameters: {
        type: "object",
        properties: {
          errorMessage: {
            type: "string",
          },
        },
      },
    },
  };
};

export const extendActions =
  (createMyActions: CreateActions) => (context: { page: Page }) => {
    const origin = createActions(context);
    const extended = createMyActions(context);
    return { ...origin, ...extended };
  };
