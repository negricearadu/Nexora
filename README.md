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

## Stage 6: data from a mock API

The initial implementation used `json-server` and `frontend/db.json`. In Stage 9, that mock server and its data file were replaced by the Express API in `backend/`. The app still fetches on load and shows loading and error states. All HTTP requests live in `frontend/src/api.js`, and the API address is read from `VITE_API_URL` (see `frontend/.env.example`), with `http://localhost:3001` as the default.

```bash
cd backend
npm install
npm run dev   # terminal 1, http://localhost:3001
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

## Stage 7: form and validation

Endpoints can be added from the page. The form (`EndpointForm`) is controlled and validated: an empty path, a path that does not start with `/`, or a path longer than 120 characters shows an error next to the form and nothing is sent. Every change (add with `POST`, toggle with `PATCH`, delete with `DELETE`) goes to the API before it shows up in the list, so it survives a page refresh. The submit button is disabled while saving, and the form is cleared only after a successful save.

`tw.json` in the repository root describes the resource used by the automated checks (`endpoints`, title field `path`, state field `documented`), and the elements from table 7.3 carry `data-testid` attributes (`form`, `form-title`, `form-method`, `form-description`, `form-submit`, `form-error`, `item`, `item-title`, `item-toggle`, `item-delete`, `empty`, `loading`, `error`).

## Stage 8: routing and detail page

Four pages behind React Router: the list (`/`), a detail page at `/endpoints/:id` (the route uses the `resource` from `tw.json`), an about page (`/despre`), and a 404 page for any other address. The header navigation uses `NavLink`, so pages change without a reload, and the endpoint path in every card is a `Link` to its detail page. The detail page loads the endpoint by id from the API, so refreshing on `/endpoints/1` works, and a missing id (for example `/endpoints/999`) shows an error with a way back to the list. Component styles moved to CSS Modules; `src/index.css` keeps only shared variables and classes.

Stage 8 adds the `data-testid` attributes from table 8.2: `nav`, `item-link`, `detail`, `detail-title`, `not-found` (plus `loading` and `error` on the detail page).

## Stage 9: own Express backend

The separate `backend/` Node.js project replaces `json-server`; the React frontend and its API URL stay the same. Express exposes `GET /health` and the complete endpoint API: `GET /endpoints`, `GET /endpoints/:id`, `POST /endpoints`, `PATCH /endpoints/:id`, and `DELETE /endpoints/:id`. The server validates endpoint fields, returns appropriate HTTP status codes and JSON errors, and enables CORS for `http://localhost:5173` by default.

The API keeps the seed endpoints in memory, so changes survive a browser refresh but reset when the backend restarts. To configure the port or allowed frontend origin, copy `backend/.env.example` to `backend/.env` and edit the values. The backend development command watches for file changes:

```bash
cd backend
npm install
npm run dev
```

Run the frontend in a second terminal with `cd frontend; npm install; npm run dev`.

### Stage 9 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S9-R1 | Express starts on port 3001 and responds to health checks | `backend/package.json`, `backend/src/server.js`, `backend/src/app.js` | Run `npm run dev` in `backend/`, then open `http://localhost:3001/health`. |
| S9-R2 | Endpoint routes support list, detail, create, update, and delete with the expected status codes | `backend/src/routes/endpoints.js` | Send GET, POST, PATCH, and DELETE requests to `/endpoints`. |
| S9-R3 | Invalid endpoint data returns HTTP 400 and a clear JSON error | `backend/src/validation.js` | POST an endpoint with an invalid path or method. |
| S9-R4 | The frontend works with json-server removed | `frontend/src/api.js`, `frontend/src/pages/EndpointsPage.jsx` | Start both projects and add, toggle, and delete an endpoint. |
| S9-R5 | The frontend origin is permitted by CORS | `backend/src/app.js` | Open the frontend and check the browser console for CORS errors. |
| S9-R6 | README and Stage 9 AI log are complete | `README.md`, `ai-log/etapa-09.md` | Review the Stage 9 section and journal. |
| S9-R7 | Stage 9 is committed and pushed | GitHub commit permalink | **Manual:** commit and push after reviewing; add the resulting permalink here. |

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

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [x] Stage 9: own backend with Express

## Project structure

```text
Nexora/
├── backend/             # Express API and server-side validation
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── validation.js
│       └── routes/
│           └── endpoints.js
├── frontend/            # Vite and React application
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/           # Reusable components and CSS Modules
│       ├── pages/                # Routed list, detail, about, and 404 pages
│       ├── api.js                # Centralized HTTP requests
│       ├── constants.js          # Shared method options and labels
│       ├── App.jsx               # Route map
│       └── index.css              # Shared design tokens and utilities
│       └── main.jsx
├── mockup/              # Previous HTML/CSS/JavaScript stages
│   ├── index.html
│   ├── endpointuri.js
│   └── style.css
├── docs.html            # Supplementary generated Users API example
├── tw.json                   # Automated-check configuration
├── ai-log/
│   ├── etapa-01.md      # AI-use journal for Stage 1
│   ├── etapa-02.md      # AI-use journal for Stage 2
│   ├── etapa-03.md      # AI-use journal for Stage 3
│   ├── etapa-04.md      # AI-use journal for Stage 4
│   ├── etapa-05.md      # AI-use journal for Stage 5
│   ├── etapa-06.md      # AI-use journal for Stage 6
│   ├── etapa-07.md      # AI-use journal for Stage 7
│   ├── etapa-08.md      # AI-use journal for Stage 8
│   └── etapa-09.md      # AI-use journal for Stage 9
└── README.md            # Project description and verification checklist
```

## How to run

```bash
cd backend
npm install
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173`. Check the API at `http://localhost:3001/health`. The backend requires Node.js 22.12 or later. The production build can be checked with `npm run build` from `frontend/`. The dark theme follows the operating system's `prefers-color-scheme` setting until the header toggle is used.

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

## Stage 6 verification checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S6-R1 | `npm run api` starts, the route shows JSON | [package.json#L10](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/package.json#L10), [db.json](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/db.json) | Open `http://localhost:3001/endpoints` |
| S6-R2 | Data no longer in React | [EndpointsPage.jsx#L8](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/src/pages/EndpointsPage.jsx#L8) (`useState([])`) | Search the components for hard-coded endpoints; only `fetch` remains |
| S6-R3 | Loading message while waiting | [EndpointsPage.jsx#L73](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/src/pages/EndpointsPage.jsx#L73) | `npm run api -- --delay 4000`, refresh |
| S6-R4 | Error message when the API is down | [EndpointsPage.jsx#L13-L27](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/src/pages/EndpointsPage.jsx#L13-L27), [#L74](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/src/pages/EndpointsPage.jsx#L74) | Stop `npm run api`, refresh |
| S6-R5 | `fetch` only in `api.js`, URL from env | [api.js#L1-L17](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/src/api.js#L1-L17), [.env.example](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/frontend/.env.example) | Search for `fetch` in `src/` |
| S6-R6 | README Stage 6 section + AI log | [README.md](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/README.md), [ai-log/etapa-06.md](https://github.com/negricearadu/Nexora/blob/1c61dfea85079c3fc890e47689a436eef3caea0a/ai-log/etapa-06.md) | Read |
| S6-R7 | Commit "Stage 6" pushed | [Stage 6: data from a mock API](https://github.com/negricearadu/Nexora/commit/1c61dfea85079c3fc890e47689a436eef3caea0a) | Commit history |

## Stage 7 verification checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S7-R1 | Controlled form: `value` + `onChange` on every field | [EndpointForm.jsx#L16-L24](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L16-L24), [#L53-L90](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L53-L90) | Read |
| S7-R2 | Empty path shows an error, nothing is sent | [EndpointForm.jsx#L8-L13](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L8-L13) (`validate`), [#L29-L36](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L29-L36) | Submit empty, watch Network |
| S7-R3 | Added item shows in the list and survives refresh | [EndpointsPage.jsx#L29-L32](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/pages/EndpointsPage.jsx#L29-L32) (`handleAdd`), [api.js#L27-L32](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/api.js#L27-L32) | Add, refresh |
| S7-R4 | Toggle and delete survive refresh | [EndpointsPage.jsx#L34-L53](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/pages/EndpointsPage.jsx#L34-L53), [api.js#L34-L43](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/api.js#L34-L43) | Toggle/delete, refresh |
| S7-R5 | Button disabled while sending, form cleared only on success | [EndpointForm.jsx#L40-L49](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L40-L49), [#L87](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L87) | `npm run api -- --delay 3000`; stop the API and submit |
| S7-R6 | `tw.json` and the `data-testid` attributes from table 7.3 | [tw.json](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/tw.json), [EndpointCard.jsx#L10-L38](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointCard.jsx#L10-L38), [EndpointForm.jsx#L53-L87](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointForm.jsx#L53-L87), [EndpointList.jsx#L6](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/frontend/src/components/EndpointList.jsx#L6) | `querySelectorAll` in the console |
| S7-R7 | README Stage 7 section + AI log | [README.md](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/README.md), [ai-log/etapa-07.md](https://github.com/negricearadu/Nexora/blob/dbf2d10fc089f94191bae784e0ae2a590a5b4839/ai-log/etapa-07.md) | Read |
| S7-R8 | Commit "Stage 7" pushed | [Stage 7: form and validation](https://github.com/negricearadu/Nexora/commit/dbf2d10fc089f94191bae784e0ae2a590a5b4839) | Commit history |

## Stage 8 verification checklist

| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S8-R1 | Header navigation changes the page without reload | [App.jsx#L10-L17](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/App.jsx#L10-L17), [Layout.jsx#L25-L34](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/components/Layout.jsx#L25-L34) | Click the links, watch Network |
| S8-R2 | A click on an item opens its detail page | [EndpointCard.jsx#L26-L28](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/components/EndpointCard.jsx#L26-L28), [EndpointDetailPage.jsx](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/EndpointDetailPage.jsx) | Click a path |
| S8-R3 | Refresh on the detail URL works; a missing id shows an error | [EndpointDetailPage.jsx#L8-L33](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/EndpointDetailPage.jsx#L8-L33), [#L43-L54](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/EndpointDetailPage.jsx#L43-L54) | Refresh `/endpoints/1`, open `/endpoints/999` |
| S8-R4 | Unknown URL shows the app 404 page | [App.jsx#L15](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/App.jsx#L15) (`path="*"`), [NotFoundPage.jsx](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/NotFoundPage.jsx) | Open `/ceva` |
| S8-R5 | Each component has its `.module.css`; `index.css` only shared styles | [src/components](https://github.com/negricearadu/Nexora/tree/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/components), [src/pages](https://github.com/negricearadu/Nexora/tree/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages), [index.css](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/index.css) | Read |
| S8-R6 | `data-testid` attributes from tables 7.3 and 8.2; detail route `/<resource>/:id` | [Layout.jsx#L25](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/components/Layout.jsx#L25), [EndpointCard.jsx#L10-L49](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/components/EndpointCard.jsx#L10-L49), [EndpointDetailPage.jsx#L38-L61](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/EndpointDetailPage.jsx#L38-L61), [NotFoundPage.jsx#L7](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/pages/NotFoundPage.jsx#L7), [App.jsx#L13](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/frontend/src/App.jsx#L13), [tw.json](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/tw.json) | `querySelector` in the console |
| S8-R7 | README Stage 8 section + AI log | [README.md](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/README.md), [ai-log/etapa-08.md](https://github.com/negricearadu/Nexora/blob/083301b70ff420e4fbf59cc1f71d33b2420bc011/ai-log/etapa-08.md) | Read |
| S8-R8 | Commit "Stage 8" pushed | [Stage 8: routing and detail page](https://github.com/negricearadu/Nexora/commit/083301b70ff420e4fbf59cc1f71d33b2420bc011) | Commit history |

## Roadmap by stage

| Stage | Goal |
| --- | --- |
| Stage 1 | Static HTML/CSS mockup |
| Stage 2 | JavaScript data logic operating on a list of objects |
| Stage 3 | Initialize the React project with Vite |
| Stage 4 | Build components from data |
| Stages 5-13 | Interactions, API, forms, server, database, authentication, Docker, and final presentation |
