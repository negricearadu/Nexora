# Stage 7: Form and persistent CRUD

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- React, fetch, json-server, and Vite

## Conversations

### 1. Add endpoint creation and validation

- **Asked:** Implement a controlled form for new endpoints with validation and server-confirmed saving.
- **Got:** `EndpointForm` controls the path, method, and description, validates required input, the leading slash, and a 120-character path limit, then sends a POST.
- **Changed or rejected:** Validation errors remain beside the form and failed saves preserve the entered values.

### 2. Persist toggle and delete operations

- **Asked:** Move documentation toggles and deletion to the API.
- **Got:** Shared request handling in `api.js` now supports POST, PATCH, and DELETE. State updates use the objects returned by the server and happen only after successful requests.
- **Changed or rejected:** No optimistic updates are used, so the interface cannot show a change that the API rejected.

## Verification

The root `tw.json` describes the `endpoints` resource, `path` title field, and `documented` state field. Required `data-testid` markers were added for automated checks. `npm run build` was run after the CRUD changes.
