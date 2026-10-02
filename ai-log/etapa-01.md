# Stage 1: AI log

## Tools

- GitHub Copilot (Copilot SDK in VS Code)

## Conversations

- This VS Code Copilot conversation was used to review the Stage 1 assignment and adapt the project to its requirements. No external share link is available for this editor conversation.

## Key requests

### 1. Create the initial Nexora mockups

- **Asked:** Create a static Nexora landing page, API documentation example, shared CSS, and README.
- **Got:** A first version with `index.html`, `docs.html`, `style.css`, and `README.md`.
- **Changed or rejected:** After reading the official Stage 1 brief, the landing page was replaced with the required API project list mockup. The supplementary `docs.html` page was kept.

### 2. Adapt the project to the official Stage 1 checklist

- **Asked:** Read the assignment and implement the required header, form, three cards, responsive layout, focus state, dark theme, README checklist, and AI journal.
- **Got:** A semantic HTML form and list, three Nexora projects, a `.done` card, a breakpoint at 700px, `:focus-visible`, dark-mode variables, and documentation.
- **Changed or rejected:** The fields were adapted from the TaskFlow example to Nexora: project name, published state, plan, category, and owner.

### 3. Verify the implementation

- **Asked:** Check that the pages render and that the responsive behavior works.
- **Got:** Browser rendering and a mobile viewport check confirmed the layout changes to one column.
- **Changed or rejected:** No JavaScript or backend was added because they are not part of Stage 1.

## What I learned / what did not work

The official brief requires a list-management mockup rather than a marketing landing page, so the first `index.html` version did not match the deliverable and was replaced. The Nexora API project model now includes all five fields needed by later stages. The page can be opened directly from disk and uses CSS-only responsive, focus, and dark-mode behavior. GitHub commit and push steps still need to be performed by the student because repository credentials and the final public URL are not available here.
