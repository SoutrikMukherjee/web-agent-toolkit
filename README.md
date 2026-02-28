# Browser Agent Skeleton

Minimal TypeScript skeleton for a browser-automation agent built on Playwright.
Designed to be the stub layer that a real Large Action Model (LAM) drops into.

---

## Architecture

Three components with clean interface separation:

**`llm.ts`** — defines the `Action` type and `getNextAction(instruction, page)`
interface. Currently a regex token parser. Swap this for any LLM API call
(OpenAI function calling, Anthropic tool use, local model) without touching
the agent or task layer.

**`agent.ts`** — executes `Action` objects against a Playwright `Page`.
Handles navigate, click, type, press, extract. Runs tasks sequentially;
extend to parallel or stateful execution as needed.

**`tasks.ts`** — defines `Task` as `{ description, steps: string[] }`.
Steps are natural language instructions fed to `getNextAction` one at a time.

---

## Run
```bash
npm install
npx playwright install chromium
npm start
```

Set `HEADLESS=false` in `.env` to watch the browser.

---

## Extending toward a real LAM

The stub in `llm.ts` parses `navigate <url>`, `click <selector>`,
`type <selector> <text>`, `press <key>`, `extract [<selector>]`.

To connect a real model, replace `getNextAction` with an LLM call
that returns structured output matching the `Action` interface —
OpenAI function calling or Anthropic tool use both map directly to this.

Next steps worth implementing:
- DOM snapshot as observation fed into each `getNextAction` call
  (currently `_page` is unused in the stub)
- Action trace recording for behavioral cloning training data
- Screenshot + vision model for grounded element selection
  instead of hardcoded CSS selectors
