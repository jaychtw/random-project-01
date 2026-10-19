# Tidelight

**Find the light. Bring it home.**

A small, complete browser game about being a lighthouse keeper on a quiet sea. Rotate mirrors to carry a golden beam across seven hand-crafted sea charts. Wake every island, guide the light into the harbor, and receive a letter from someone on the other shore.

Original canvas artwork, animated water, synthesized musical notes, and a seven-chapter story. No accounts, backend, API keys, external assets, or runtime network requests. Built with JavaScript, Canvas 2D, and Vite.

## Play locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite in a normal local development environment. Click or tap the circular mirrors to alternate their diagonal orientation. Light **all** islands and reach the house with the dotted harbor ring. There is no timer. Undo, reset, and hints are available. Select any chapter using the seven progress bars. Completed chapters save in browser local storage; reset only resets the current puzzle. Sound is optional and starts muted.

Keyboard: Tab to a mirror and press Enter or Space. Escape dismisses the handbook or a letter. All gameplay controls are HTML buttons over the canvas chart.

## Build and check

```sh
npm test                  # 15 simulation tests, including every orientation combination
npm run build             # produces the static site in dist/
npx playwright install chromium
npm run test:browser      # desktop and touch-sized browser checks
npm run preview           # serve the production build
```

Browser tests automatically use `/usr/bin/chromium` when available, otherwise the Playwright-installed browser. Set `CHROMIUM_PATH` to override the executable. On Linux, `npx playwright install --with-deps chromium` can install system prerequisites where permitted.

The browser tests complete all seven chapters, check letters and persisted progress, test undo/reset/hints, keyboard operation, audio toggling, invalid stored data, and mobile horizontal overflow. GitHub Actions runs the tests and build on pushes and pull requests and uploads the production files as `tidelight-web`.

## Publish the game

Deploy the contents of `dist/` to any static web host. No server process is required in production. For a host under a subdirectory, build with `npm run build -- --base=./`. Pushing source code alone does not create a public game URL.

## Project map

- `src/game.js`: chapter definitions and deterministic, DOM-free beam simulation.
- `src/main.js`: rendering, interaction, procedural audio, and progress storage.
- `src/style.css`: responsive sea-chart interface.
- `tests/`: simulation and browser regression tests.

Each chapter is defined by a non-self-intersecting route. Mirrors derive their intended orientation from its bends; every bend is an island that must receive light. The simulation tracks direction as well as position and terminates on repeated states, preventing mirror loops from hanging the game.
