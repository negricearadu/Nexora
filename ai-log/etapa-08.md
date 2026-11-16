# Stage 8: Routing and component styling

## Tools

- GitHub Copilot (Copilot SDK in VS Code)
- React Router, CSS Modules, and Vite

## Conversations

### 1. Add application routes

- **Asked:** Split the application into list, detail, about, and not-found pages with client-side navigation.
- **Got:** A shared `Layout` with `NavLink` and `Outlet`, routes for `/`, `/endpoints/:id`, `/despre`, and `*`, plus a detail page that fetches exactly the endpoint identified by `useParams`.
- **Changed or rejected:** The resource name in `tw.json` is `endpoints`, so the detail route follows `/endpoints/:id`.

### 2. Move styles to CSS Modules

- **Asked:** Organize component and page styles without losing the Stage 7 test hooks or the existing Nexora visual language.
- **Got:** CSS Modules sit beside cards, lists, forms, layout, and pages. Shared variables and utility classes remain in `src/index.css`.
- **Changed or rejected:** The legacy `App.css` remains as historical Stage 1 styling but is no longer imported by the React entry point.

## Verification

`npm run build` was run after routing and CSS Module changes.
