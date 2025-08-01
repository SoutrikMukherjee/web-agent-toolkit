import { Page } from 'playwright';

/**
 * Definition of a browser action.  An agent decides what to do by
 * returning one of these objects.  Additional fields can be added
 * as your agent becomes more sophisticated.
 */
export interface Action {
  type: 'navigate' | 'click' | 'type' | 'press' | 'extract' | string;
  url?: string;
  selector?: string;
  text?: string;
  key?: string;
}

/**
 * A stubbed language model that converts high‑level natural language
 * instructions into low‑level browser actions.  In a real system this
 * would call into a large language model (such as GPT‑4) and parse its
 * structured output.  For now, we implement simple pattern matching to
 * support a handful of instructions:
 *
 * - `navigate <url>` – open the given URL.
 * - `click <selector>` – click on a CSS selector.
 * - `type <selector> <text>` – fill an input element with text.
 * - `press <key>` – press a keyboard key (e.g. Enter).
 * - `extract [<selector>]` – extract text from the page (default selector: body).
 *
 * Any instruction that does not match these patterns will result in an
 * unknown action which you can handle in `agent.ts`.
 */
export async function getNextAction(instruction: string, _page: Page): Promise<Action> {
  const tokens = instruction.trim().split(/\s+/);
  const command = tokens[0].toLowerCase();
  switch (command) {
    case 'navigate':
      return { type: 'navigate', url: tokens[1] };
    case 'click':
      return { type: 'click', selector: tokens.slice(1).join(' ') };
    case 'type':
      // The first argument after 'type' is the selector.  The rest is the text to type.
      const selector = tokens[1];
      const text = tokens.slice(2).join(' ');
      return { type: 'type', selector, text };
    case 'press':
      return { type: 'press', key: tokens[1] };
    case 'extract':
      // Optional selector.  If none provided, default will be handled in agent.ts
      return { type: 'extract', selector: tokens[1] };
    default:
      // If you wish, you could throw here or attempt a more sophisticated parse.
      return { type: 'unknown' };
  }
}