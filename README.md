# Nexora

Nexora is a web application for turning OpenAPI files into clear, hosted, wiki-style API documentation. The Stage 2 data model manages API endpoints with the fields `id`, `path`, `method`, `description`, and `documented`.

## Problem it solves

API documentation is often difficult to keep organized and up to date. Nexora will give development teams one place to add API projects, generate documentation from OpenAPI specifications, and publish a readable reference for their users.

## Stage 1 theme and sample content

The Stage 1 interface is a static API project workspace. The following controls and cards are visual mockup content, not the Stage 2 data model:

- **Project name**: text entered by the user
- **Published**: a boolean checkbox representing the project state
- **Plan**: a fixed list containing Free, Pro, and Enterprise
- **Category**: a fixed list containing REST API, GraphQL API, and Internal API
- **Owner**: the user responsible for the project

The three hard-coded sample projects are Commerce API, Users API, and Analytics Gateway. Commerce API is intentionally shown as finished/published with a strikethrough title so the completed-card requirement is visible.

## Stage 2: data logic

Plain JavaScript, no DOM. `endpointuri.js` holds the array of API endpoints and the functions that read and change it. Results are printed in the browser console (F12).

## Stage 3: Vite and React project

The app now lives in `frontend/`, built with Vite. The endpoint data from Stage 2 moved into the main React component, and the list is still printed raw as JSON until Stage 4.

## Stage 4: components rendered from data

The endpoint list is now rendered from the data through two React components:

- `EndpointList` receives the whole `endpoints` array and renders one card per item with `map`.
- `EndpointCard` receives one endpoint through props and displays its method, path, description, and documented state.
- The empty-list branch displays an explicit message, and each card uses its endpoint `id` as the React `key`.

## Stage 5: local state and events

The endpoint list now lives in React state. Users can mark endpoints as documented or delete them directly from the page, while the header counters update automatically. A button in the header switches between light and dark mode. These changes are local to the browser and reset on refresh.

## Planned features

- Upload OpenAPI files in YAML or JSON format
- Generate endpoint documentation automatically
- Client-side documentation search
- API versioning
- Customizable documentation themes
- Publish to a subdomain or export as a ZIP archive

## Planned tech stack

- HTML and CSS
- JavaScript
- React with Vite
- Node.js + Express
- PostgreSQL
- EJS templates

## Current status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## Project structure

```text
Nexora/
├── frontend/            # Vite and React application
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── EndpointCard.jsx  # Stage 4 single endpoint component
│       │   └── EndpointList.jsx  # Stage 4 list component
│       ├── App.jsx      # Stage 4 data and main component
│       ├── App.css      # Reused Stage 1 styles
│       └── main.jsx
├── mockup/              # Previous HTML/CSS/JavaScript stages
│   ├── index.html
│   ├── endpointuri.js
│   └── style.css
├── docs.html            # Supplementary generated Users API example
├── ai-log/
│   ├── etapa-01.md      # AI-use journal for Stage 1
│   ├── etapa-02.md      # AI-use journal for Stage 2
│   ├── etapa-03.md      # AI-use journal for Stage 3
│   ├── etapa-04.md      # AI-use journal for Stage 4
│   └── etapa-05.md      # AI-use journal for Stage 5
└── README.md            # Project description and verification checklist
```

## How to run

```bash
cd frontend
npm install
npm run dev
```

Then open the address printed in the terminal, usually `http://localhost:5173`. The production build can be checked with `npm run build`. The dark theme follows the operating system's `prefers-color-scheme` setting.

## AI usage

This project used **GitHub Copilot (Copilot SDK in VS Code)** to help draft and revise the static HTML/CSS structure, responsive rules, accessibility focus styles, README, AI log, and Stage 2 data logic. The final theme, fields, sample data, and requirement mapping were reviewed and adapted to the university specification.

## Stage 1 verification checklist

The `Where` links below are local source references for the current working version. After publishing the Stage 1 commit to GitHub, replace them with GitHub commit permalinks as required by the assignment.

| ID | Requirement | Where | How to check |
| --- | --- | --- | --- |
| S1-R1 | README contains description, fields, sample data, and how to run | [README.md](./README.md) | Read the theme, sample-data, and viewing sections |
| S1-R2 | README contains AI usage declaration | [README.md](./README.md) | Read the AI usage section |
| S1-R3 | Stage 1 AI log exists | [ai-log/etapa-01.md](./ai-log/etapa-01.md) | Read the stage journal |
| S1-R4 | Header, text form field, fixed lists, and three own cards | [mockup/index.html](./mockup/index.html) | Open the page and inspect the form and project list |
| S1-R5 | One card is visibly finished | [mockup/index.html](./mockup/index.html) and [frontend/src/App.css](./frontend/src/App.css) | Commerce API has class `done` and a crossed-out title |
| S1-R6 | Two columns on desktop and one below 700px | [frontend/src/App.css](./frontend/src/App.css) | Resize the page below 700px |
| S1-R7 | Visible focus and readable dark theme | [frontend/src/App.css](./frontend/src/App.css) | Press Tab and emulate `prefers-color-scheme: dark` |
| S1-R8 | Stage 1 commit published to GitHub | Git history and repository URL | Check for a public commit named `Stage 1: static mockup with HTML and CSS` |

## Stage 3 verification checklist

The `Where` links below are local source references for the current working version. Replace them with GitHub permalinks after publishing the Stage 3 commits.

| ID | Requirement | Where | How to check |
| --- | --- | --- | --- |
| S3-R1 | `npm run dev` starts without errors | [frontend/package.json](./frontend/package.json) | Run `npm install`, then `npm run dev` |
| S3-R2 | App name and counter are computed from data | [frontend/src/App.jsx](./frontend/src/App.jsx) | Edit the endpoint array and save |
| S3-R3 | Data comes from the Nexora Stage 2 model | [frontend/src/App.jsx](./frontend/src/App.jsx) | Compare the endpoint objects with `mockup/endpointuri.js` |
| S3-R4 | Stage 1 styles are reused | [frontend/src/App.css](./frontend/src/App.css) | Inspect the page styling |
| S3-R5 | `node_modules/` is ignored and build passes | [frontend/.gitignore](./frontend/.gitignore) | Run `npm run build` |
| S3-R6 | README and AI log are updated | [README.md](./README.md), [ai-log/etapa-03.md](./ai-log/etapa-03.md) | Read the Stage 3 sections |
| S3-R7 | Stage 3 commit is published | Git history and repository URL | Check the commit history after push |

## Stage 4 verification checklist

The `Where` links below are local source references for the current working version. Replace them with GitHub permalinks after publishing the Stage 4 commits.

| ID | Requirement | Where | How to check |
| --- | --- | --- | --- |
| S4-R1 | At least two components exist in `src/components/` | [frontend/src/components/](./frontend/src/components/) | Open the folder and inspect both component files |
| S4-R2 | The card receives one endpoint through props | [EndpointCard.jsx](./frontend/src/components/EndpointCard.jsx) | Read the component parameter and rendered endpoint fields |
| S4-R3 | The list uses `map` and `key={endpoint.id}` without console warnings | [EndpointList.jsx](./frontend/src/components/EndpointList.jsx) | Run the app and inspect the browser Console |
| S4-R4 | An empty list displays a message | [EndpointList.jsx](./frontend/src/components/EndpointList.jsx) | Temporarily set `endpoints` to `[]` |
| S4-R5 | The documented state changes the card appearance | [EndpointCard.jsx](./frontend/src/components/EndpointCard.jsx) | Toggle an endpoint's `documented` value and observe the `done` class |
| S4-R6 | README and the Stage 4 AI log are complete | [README.md](./README.md), [ai-log/etapa-04.md](./ai-log/etapa-04.md) | Read the Stage 4 sections |
| S4-R7 | The Stage 4 commit is published | Git history and repository URL | Check the commit history after pushing |

## Stage 5 verification checklist

The `Where` links below are local source references for the current working version. Replace them with GitHub permalinks after publishing the Stage 5 commits.

| ID | Requirement | Where | How to check |
| --- | --- | --- | --- |
| S5-R1 | The list is kept in `useState` in `App` | [frontend/src/App.jsx](./frontend/src/App.jsx) | Read the state declaration |
| S5-R2 | Toggling changes state and card appearance | [EndpointCard.jsx](./frontend/src/components/EndpointCard.jsx), [App.jsx](./frontend/src/App.jsx) | Click a checkbox and inspect the card and counter |
| S5-R3 | Deleting removes the endpoint | [EndpointCard.jsx](./frontend/src/components/EndpointCard.jsx), [App.jsx](./frontend/src/App.jsx) | Click `Șterge` |
| S5-R4 | The header counter is derived, not stored in state | [frontend/src/App.jsx](./frontend/src/App.jsx) | Toggle an endpoint and watch the counter |
| S5-R5 | Updates are immutable | [frontend/src/App.jsx](./frontend/src/App.jsx) | Read the `map`, `filter`, and functional state updates |
| S5-R6 | Light/dark mode uses state and `data-theme` | [frontend/src/App.jsx](./frontend/src/App.jsx), [frontend/src/App.css](./frontend/src/App.css) | Click the theme button with either system theme |
| S5-R7 | No console warnings; README and AI log are updated | [README.md](./README.md), [ai-log/etapa-05.md](./ai-log/etapa-05.md) | Run the app and inspect the browser Console |
| S5-R8 | The Stage 5 commit is published | Git history and repository URL | Check the commit history after pushing |

## Roadmap by stage

| Stage | Goal |
| --- | --- |
| Stage 1 | Static HTML/CSS mockup |
| Stage 2 | JavaScript data logic operating on a list of objects |
| Stage 3 | Initialize the React project with Vite |
| Stage 4 | Build components from data |
| Stages 5-13 | Interactions, API, forms, server, database, authentication, Docker, and final presentation |
