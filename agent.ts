import { chromium, Browser, Page } from 'playwright';
import dotenv from 'dotenv';
import { tasks, Task } from './tasks';
import { getNextAction, Action } from './llm';

// Load environment variables from .env file if present.
dotenv.config();

/**
 * Performs a single action on the page.  Extending this function allows
 * you to support additional action types with ease.
 */
async function performAction(action: Action, page: Page): Promise<void> {
  switch (action.type) {
    case 'navigate':
      if (!action.url) throw new Error('navigate action requires a url');
      console.log(`→ navigating to ${action.url}`);
      await page.goto(action.url);
      break;
    case 'click':
      if (!action.selector) throw new Error('click action requires a selector');
      console.log(`→ clicking ${action.selector}`);
      await page.click(action.selector);
      break;
    case 'type':
      if (!action.selector || action.text === undefined) {
        throw new Error('type action requires a selector and text');
      }
      console.log(`→ typing "${action.text}" into ${action.selector}`);
      await page.fill(action.selector, action.text);
      break;
    case 'press':
      if (!action.key) throw new Error('press action requires a key');
      console.log(`→ pressing ${action.key}`);
      await page.keyboard.press(action.key);
      break;
    case 'extract':
      // If no selector provided, fall back to the body element.
      const sel = action.selector ?? 'body';
      console.log(`→ extracting text from ${sel}`);
      const text = await page.textContent(sel);
      console.log('Extracted text (truncated to 500 characters):');
      console.log(text?.slice(0, 500));
      break;
    default:
      console.warn('Unknown action type:', action);
  }
}

/**
 * Run all tasks sequentially.  For each step in a task, call the LLM
 * to determine what action to perform and then execute it.  You could
 * extend this to run tasks in parallel or to maintain state across tasks.
 */
async function runTasks(browser: Browser): Promise<void> {
  const context = await browser.newContext();
  const page = await context.newPage();
  for (const task of tasks) {
    console.log(`\n=== Starting task: ${task.description} ===`);
    for (const step of task.steps) {
      // Ask the (stubbed) LLM to translate a natural language instruction into a concrete action.
      const action = await getNextAction(step, page);
      await performAction(action, page);
    }
    console.log(`=== Completed task: ${task.description} ===\n`);
  }
  await context.close();
}

async function main(): Promise<void> {
  const headlessEnv = process.env.HEADLESS;
  const headless = headlessEnv === undefined ? true : headlessEnv.toLowerCase() !== 'false';
  const browser = await chromium.launch({ headless });
  try {
    await runTasks(browser);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('Agent encountered an error:', err);
  process.exitCode = 1;
});