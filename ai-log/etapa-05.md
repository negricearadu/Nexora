# Stage 5: AI log

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- npm and Vite

## Conversations

### 1. Add local state and events

- **Asked:** Transform the Stage 4 endpoint list into an interactive list where each endpoint can be marked as documented or deleted, with automatic counter updates.
- **Got:** `App` now owns the endpoint array with `useState`. `handleToggle` uses `map` and a copied object, while `handleDelete` uses `filter`; both use the functional state-update form.
- **Changed or rejected:** No separate state was added for the counters. The number of undocumented endpoints remains derived from the current list on every render.

### 2. Add light and dark mode

- **Asked:** Add a header button that switches between light and dark themes and works regardless of the operating system theme.
- **Got:** The selected theme is stored in state, written as `data-theme` on the `html` element, and used by CSS variables. The initial value follows `prefers-color-scheme`.
- **Changed or rejected:** The theme is intentionally not persisted in `localStorage`, matching the requirements for this stage.

### 3. Verify the implementation

- **Asked:** Check the Stage 5 implementation.
- **Got:** `npm run build` completed successfully and the edited source files reported no diagnostics.

## What I learned / what did not work

The parent component must own both the list and the handlers because the card only receives props. Controlled checkboxes need both `checked` and `onChange`, and delete buttons must receive a callback rather than calling it during render. The existing Stage 4 `done` styling could be reused for documented endpoints, so the state change remains visible without duplicating card styles.