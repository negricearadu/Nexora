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

### 3. Add the Stage 8 test hooks and fix the detail page

- **Asked:** The automated check could not find the navigation, the item links, the detail title, or the 404 page, so the pages were compared with table 8.2.
- **Got:** `data-testid="nav"` on the header `nav`, `item-link` on the card title link, `detail` and `detail-title` on the detail page, `loading` on its loading message, and `not-found` on the 404 page.
- **Changed or rejected:** The theme button was moved out of `nav` so the navigation only contains links. The card's `label` around the title link was replaced with a `div` and the checkbox got an `aria-label`, so clicking the title opens the detail page instead of toggling. The error on the detail page now offers a link back to the list. A footer link to `docs.html`, which the Vite app does not serve, was removed.

## Verification

`npm run build` was run after routing and CSS Module changes. The built app was then checked in a browser against `npm run api`: header navigation without reload, a click on a title opening `/endpoints/:id` with the same title, refresh on a detail URL, `/endpoints/999` showing an error, `/ceva` showing the 404 page, and the Stage 7 checks (empty submit, add, toggle, delete, each surviving a reload).
