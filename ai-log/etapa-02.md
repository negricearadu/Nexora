# Stage 2: AI log

## Tools

- GitHub Copilot (Copilot SDK in VS Code)

## Conversations

- This VS Code Copilot conversation was used to implement and review the Stage 2 JavaScript data logic for Nexora. No external share link is available for this editor conversation.

## Key requests

### 1. Create the endpoint data model

- **Asked:** Add `endpointuri.js` next to `index.html` with a fixed list of API methods and three sample endpoints.
- **Got:** The `METHODS` constant and an `endpoints` array using the fields `id`, `path`, `method`, `description`, and `documented`.
- **Changed or rejected:** The identifiers were initially written in Romanian to match the first brief, then renamed to English at the student's request. Console messages remain in Romanian with diacritics.

### 2. Implement immutable data functions

- **Asked:** Add functions for listing paths, counting undocumented endpoints, searching endpoints, generating the next id, adding endpoints, toggling documentation state, and deleting endpoints.
- **Got:** `listPaths`, `countUndocumented`, `findEndpoint`, `nextId`, `addEndpoint`, `toggleDocumented`, and `deleteEndpoint`. The functions use `map`, `filter`, `find`-style search behavior through `filter` and `includes`, and `reduce` where appropriate.
- **Changed or rejected:** The implementation does not use the DOM, event handlers, imports, Node.js, npm, array mutation, or `list.length + 1`. New arrays and objects are returned instead of modifying input values.

### 3. Add validation and manual tests

- **Asked:** Validate empty paths, paths without a leading slash, and unsupported HTTP methods, then add console tests in the required sections.
- **Got:** `addEndpoint` trims paths, reports invalid input in Romanian, preserves the original list on validation failure, and creates a new endpoint with the next id and `documented: false`. Manual tests cover reading, adding, modifying, deleting, and validation.
- **Changed or rejected:** The visible HTML layout was not changed. The script was added to `index.html` immediately before `</body>` so the results are available in the browser console.

### 4. Update the project documentation

- **Asked:** Document Stage 2 and update the project status in `README.md`.
- **Got:** A Stage 2 section explaining the plain JavaScript and console workflow, the endpoint data model fields, and the completed Stage 1 and Stage 2 checklist items.
- **Changed or rejected:** The existing Stage 1 description and `docs.html` page were preserved.

## What I learned / what did not work

Stage 2 separates endpoint data operations from the visual mockup. Immutable functions make it possible to add, update, and delete endpoints without changing the original list, which is demonstrated by comparing the original and new list lengths in the console. The next id must be calculated with `reduce` so deleted items do not cause duplicate identifiers.

The first version used Romanian identifiers because that was stated in the original Stage 2 brief. After the student requested English names, the identifiers and data property names were renamed to `METHODS`, `endpoints`, `path`, `method`, `description`, `documented`, and English function names. Romanian console messages were intentionally kept because they are part of the required output.
