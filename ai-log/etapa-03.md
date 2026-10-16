# Stage 3: AI log

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- npm and Vite

## Conversations

- This VS Code Copilot conversation was used to adapt the Nexora project to the Stage 3 Vite and React requirements.

## Key requests

### 1. Initialize the React project

- **Asked:** Create the Vite React application in `frontend/`, remove the demo content, and run the application through the development server.
- **Got:** A Vite project with React, `frontend/src/main.jsx`, `frontend/src/App.jsx`, `frontend/src/App.css`, and the required npm scripts.
- **Changed or rejected:** The generated demo assets and styles were not kept because the Nexora styles from Stage 1 are reused.

### 2. Move the Stage 2 data into React

- **Asked:** Move the Nexora endpoint data into the main component and calculate the header values from that data.
- **Got:** `App.jsx` contains the three endpoint objects from Stage 2, calculates the number of undocumented endpoints with `filter`, and temporarily renders the list with `JSON.stringify`.
- **Changed or rejected:** The endpoint cards and interactions were postponed to Stage 4, as required by the assignment.

### 3. Update documentation and verify the build

- **Asked:** Update the README, add the Stage 3 AI journal, and verify the project builds.
- **Got:** The README now documents `npm install`, `npm run dev`, the project structure, and the Stage 3 checklist. `npm run build` completed successfully and `node_modules/` and `dist/` are ignored.

## What I learned / what did not work

The existing Nexora theme maps naturally to the assignment's list model by treating API endpoints as the list items and undocumented endpoints as the active/uncompleted values. The Stage 1 stylesheet needed only the Stage 3 one-column container adjustment; the visual language remains reused. The first automated validation runner was unavailable because of a model-support error, so the same install and build commands were run directly in the PowerShell terminal instead.
