# Nexora

Nexora is a web application for turning OpenAPI files into clear, hosted, wiki-style API documentation. The application manages a list of API projects. Each project has a name, a published/draft state, a plan label, a category, and an owner. This model gives the later JavaScript, React, server, database, and authentication stages the data they need.

## Problem it solves

API documentation is often difficult to keep organized and up to date. Nexora will give development teams one place to add API projects, generate documentation from OpenAPI specifications, and publish a readable reference for their users.

## Stage 1 theme and sample data

The Stage 1 interface is a static API project workspace. The add form contains:

- **Project name**: text entered by the user
- **Published**: a boolean checkbox representing the project state
- **Plan**: a fixed list containing Free, Pro, and Enterprise
- **Category**: a fixed list containing REST API, GraphQL API, and Internal API
- **Owner**: the user responsible for the project

The three hard-coded sample projects are Commerce API, Users API, and Analytics Gateway. Commerce API is intentionally shown as finished/published with a strikethrough title so the completed-card requirement is visible.

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

**Stage 1 - static HTML/CSS mockup**

The current implementation contains a semantic static page with a header, add-project form, project list, three cards, responsive layout, visible keyboard focus, and a dark color scheme based on `prefers-color-scheme`. There is no JavaScript or backend yet.

## Project structure

```text
Nexora/
├── index.html           # Stage 1 API project list mockup
├── docs.html            # Supplementary generated Users API example
├── style.css            # Shared stylesheet and Stage 1 responsive styles
├── ai-log/
│   └── etapa-01.md      # AI-use journal for Stage 1
└── README.md            # Project description and verification checklist
```

## How to view it

Open [index.html](./index.html) directly in a browser. No server, JavaScript, package installation, or framework is required for Stage 1. Resize the browser below 700px to verify the one-column layout. The dark theme follows the operating system's `prefers-color-scheme` setting; it can be emulated from the browser DevTools Rendering panel.

## AI usage

This stage used **GitHub Copilot (Copilot SDK in VS Code)** to help draft and revise the static HTML/CSS structure, responsive rules, accessibility focus styles, README, and AI log. The final theme, fields, sample data, and requirement mapping were reviewed and adapted to the university Stage 1 specification. No JavaScript or backend code was generated for this stage.

## Stage 1 verification checklist

The `Where` links below are local source references for the current working version. After publishing the Stage 1 commit to GitHub, replace them with GitHub commit permalinks as required by the assignment.

| ID | Requirement | Where | How to check |
| --- | --- | --- | --- |
| S1-R1 | README contains description, fields, sample data, and how to run | [README.md](./README.md) | Read the theme, sample-data, and viewing sections |
| S1-R2 | README contains AI usage declaration | [README.md](./README.md) | Read the AI usage section |
| S1-R3 | Stage 1 AI log exists | [ai-log/etapa-01.md](./ai-log/etapa-01.md) | Read the stage journal |
| S1-R4 | Header, text form field, fixed lists, and three own cards | [index.html](./index.html) | Open the page and inspect the form and project list |
| S1-R5 | One card is visibly finished | [index.html](./index.html) and [style.css](./style.css) | Commerce API has class `done` and a crossed-out title |
| S1-R6 | Two columns on desktop and one below 700px | [style.css](./style.css) | Resize the page below 700px |
| S1-R7 | Visible focus and readable dark theme | [style.css](./style.css) | Press Tab and emulate `prefers-color-scheme: dark` |
| S1-R8 | Stage 1 commit published to GitHub | Git history and repository URL | Check for a public commit named `Stage 1: static mockup with HTML and CSS` |

## Roadmap by stage

| Stage | Goal |
| --- | --- |
| Stage 1 | Static HTML/CSS mockup |
| Stage 2 | JavaScript data logic operating on a list of objects |
| Stage 3 | Initialize the React project with Vite |
| Stage 4 | Build components from data |
| Stages 5-13 | Interactions, API, forms, server, database, authentication, Docker, and final presentation |
