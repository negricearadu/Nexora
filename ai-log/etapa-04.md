# Stage 4: AI log

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- npm and Vite

## Conversations

### 1. Build components from endpoint data

- **Asked:** Replace the raw JSON output from Stage 3 with a list of cards rendered from data, using one component for a card and one component for the complete list. Update the README and AI log for Stage 4.
- **Got:** `EndpointCard` receives one endpoint through props. `EndpointList` receives the complete array, handles the empty-list case, and renders cards with `map` and `key={endpoint.id}`.
- **Changed or rejected:** The temporary `JSON.stringify` output was removed. The existing Nexora endpoint data model and Stage 1 visual classes were kept so the page remains consistent with the earlier stages.

### 2. Verify the implementation

- **Asked:** Check that the React project still builds after the component split.
- **Got:** `npm install` restored the local dependencies, then `npm run build` completed successfully with Vite.
- **Changed or rejected:** No new state or event handlers were added because those belong to Stage 5.

## What I learned / what did not work

The endpoint array is the natural source for the new cards: adding another object creates another `EndpointCard` without changing the JSX structure. The documented boolean controls both the state label and the `done` class, while the endpoint id provides the stable React key. The first build attempt could not find `vite` because `node_modules` was not installed; running `npm install` fixed the environment and the following production build passed.