# Stage 9: own Express backend

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- Node.js, Express, and the built-in `fetch` API

## Conversations

### 1. Replace json-server with the project backend

- **Asked:** Follow the Stage 9 guide, preserve the existing Nexora endpoint app, and do not create a commit or push.
- **Got:** Added a separate ESM Express server with a health route, CORS, JSON parsing, centralized 404/error handling, and in-memory endpoint data. The API supports list, detail, create, partial update, and delete routes using the existing endpoint fields.
- **Changed or rejected:** Kept the frontend routes and API base URL unchanged. Removed `json-server` and its data file; the backend starts with the existing sample endpoints and keeps changes in memory until it restarts.

### 2. Validate requests on the server

- **Asked:** Make server-side validation authoritative rather than relying only on the form.
- **Got:** Added shared validation for endpoint paths, supported methods, descriptions, documented state, and positive integer IDs. Invalid input returns a JSON error with HTTP 400; absent IDs return 404, successful creation returns 201, and successful deletion returns 204.
- **Changed or rejected:** Unknown request fields are ignored so clients cannot supply or overwrite endpoint IDs.

### 3. Keep frontend errors useful

- **Asked:** Show errors returned by the Express API in the existing form and page error states.
- **Got:** The shared frontend request helper now uses the API's JSON `error` message for failed responses, while retaining a status-based fallback for non-JSON responses.
- **Changed or rejected:** No frontend components or routes needed to change.

## Verification

- `npm install` completed in `backend/`; `npm uninstall json-server` removed the mock API dependency from `frontend/`.
- `npm run build` completed in `frontend/`.
- The Express API was checked for health, list/detail reads, create/update/delete, invalid payloads and IDs, missing resources and routes, and the allowed CORS preflight.
- The frontend was opened against Express in a browser; initial data loaded, add/toggle/delete worked, and a missing endpoint displayed the server's JSON error message.
- No commit or push was created. The Stage 9 publish/permalink checklist item is left for the project owner.
