/**
 * A task consists of a human‑readable description and a sequence of
 * natural language instructions.  The agent will feed each instruction
 * into the language model stub (see `llm.ts`) and then execute the
 * resulting action on the browser.
 */
export interface Task {
  /** A short description of what this task accomplishes. */
  description: string;
  /** A list of instructions to execute in order. */
  steps: string[];
}

/**
 * Example tasks for the agent to execute.  Feel free to modify or add
 * tasks.  Each instruction in `steps` should follow the patterns
 * understood by the stubbed language model: navigate, click, type,
 * press, extract.
 */
export const tasks: Task[] = [
  {
    description: 'Search for “BrowserOS open‑source browser agent” and extract some page text',
    steps: [
      'navigate https://duckduckgo.com',
      // Fill the search box.  The DuckDuckGo home page has an input with name="q".
      'type input[name=q] BrowserOS open-source browser agent',
      // Submit the form by pressing Enter.
      'press Enter',
      // Wait a moment for results to load.  Pressing Enter triggers navigation so Playwright will automatically wait.
      // Extract text from the results page.  Using body as selector will return the entire page body.
      'extract body'
    ]
  }
];