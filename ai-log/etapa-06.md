# Stage 6: API loading

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- npm, Vite, and json-server

## Conversations

### 1. Move endpoint data to a mock REST API

- **Asked:** Read the Stage 6 guide and move the endpoint list from React state into a REST API.
- **Got:** Added `frontend/db.json`, a fixed `json-server@0.17.4` API script, `src/api.js`, and `VITE_API_URL` documentation.
- **Changed or rejected:** The Nexora resource is named `endpoints` and keeps the existing `path`, `method`, `description`, and `documented` fields instead of using the guide's task names.

### 2. Add loading and error states

- **Asked:** Make the app fetch data on mount and show useful feedback when the API is loading or unavailable.
- **Got:** The list page uses `useEffect`, cancellation cleanup, and separate loading, success, and error rendering.
- **Changed or rejected:** The existing local list is no longer the source of truth; `db.json` is now the source used by the app.

## Verification

`npm run build` was run after the API and loading changes.
