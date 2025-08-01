# BrowserOS Candidate Agent

This repository contains a small TypeScript project designed to showcase the skills and interests relevant to the **ML Research Engineer Intern** position at **BrowserOS**.  The goal of the project is to demonstrate how to build a simple browser‐automation agent with room for integration into larger research efforts on **Large Action Models (LAMs)**.

The core idea behind LAMs is to teach a model to convert high level instructions into low level browser actions such as clicking, typing or navigating.  In this project we implement a minimal skeleton of such an agent in TypeScript using [Playwright](https://playwright.dev/).  Actions are determined by a stubbed “LLM” module that you can later replace with a real language model.

## Why this project?

BrowserOS envisions a future where web browsers behave like operating systems for intelligent agents.  A successful ML Research Engineer must understand both the **machine learning** aspects (e.g. fine‑tuning models on action data) and the **systems** aspects (e.g. browser automation, TypeScript, asynchronous programming).  This sample project illustrates:

- **Browser automation**: How to control a Chromium instance programmatically.
- **Action modelling**: A simple interface for turning natural language instructions into concrete browser actions.
- **TypeScript proficiency**: Strong typing and modern JavaScript patterns.
- **Extensibility**: Clear separation between the agent core (`agent.ts`), the “LLM” (`llm.ts`) and the tasks (`tasks.ts`), making it easy to swap in a real model or add new behaviours.

Although this example is intentionally lightweight, it provides a solid foundation for exploring ideas such as reinforcement learning over browser states, integrating vision modules for DOM perception, or connecting to external LLM APIs.

## Structure

```
XYZ/
├── README.md         – this file
├── package.json      – project metadata and scripts
├── tsconfig.json     – TypeScript compiler configuration
├── src/
│   ├── agent.ts      – main entry point; runs the browser agent
│   ├── llm.ts        – stub for converting instructions into actions
│   └── tasks.ts      – example tasks for the agent to execute
└── .env.example      – template for environment variables (API keys, etc.)
```

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **(Optional) configure environment variables**

   Copy `.env.example` to `.env` and fill in any required API keys (for example, OpenAI) if you wish to connect to a real LLM.  This project runs without any keys by default since it ships with a stubbed model.

3. **Run the agent**

   ```bash
   npm start
   ```

   The agent will spin up a headless Chromium instance, execute the tasks defined in `tasks.ts`, and log the actions it performs along with any extracted text.  You can modify the tasks or add new ones to experiment.

## Extending this project

Here are a few ideas to extend or adapt this skeleton to real research on BrowserOS:

- **Integrate a real LLM**: Replace the simple parser in `llm.ts` with calls to your favourite LLM API.  Parse the model’s responses into `Action` objects understood by the agent.
- **Collect action traces**: Instrument the agent to record observations (DOM snapshots), actions and rewards.  These traces can be used to train a large action model via behavioural cloning or reinforcement learning.
- **Add vision modules**: Use screenshot APIs and computer vision (e.g. GPT‑4 Vision or multimodal models) to allow the agent to “see” the page and ground its actions.
- **Experiment with memory and planning**: Build a higher level controller that sequences multiple tasks, stores intermediate results and reasons about long‐term goals.

## Disclaimer

This repository is a demonstration and not an official BrowserOS product.  It is intended solely to showcase the author’s technical abilities and understanding of browser agents.  Use responsibly and at your own risk.