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

### 3. Align the test hooks with table 7.3

- **Asked:** The automated check could not find the form and card, so the `data-testid` names were compared one by one with table 7.3.
- **Got:** The custom names (`item-form`, `item-card`, `item-submit`, and the `item-*` names on form fields) were replaced with the required ones: `form`, `form-title`, `form-method`, `form-description`, `form-submit`, `item`. `tw.json` received a `sample` object with valid values for the extra form fields.
- **Changed or rejected:** The invalid field is now marked with `aria-invalid` only for validation errors, not for server errors, and a failed save shows a message that says what failed while keeping the typed values.

## Verification

The root `tw.json` describes the `endpoints` resource, `path` title field, and `documented` state field. Required `data-testid` markers were added for automated checks. `npm run build` was run after the CRUD changes.
