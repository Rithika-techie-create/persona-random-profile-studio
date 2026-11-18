# Persona — Random Profile Studio

*Discover people. Explore identities.*

A React + Vite app that fetches random profiles from the [Random User API](https://randomuser.me) and presents them in a custom-styled dashboard.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Features

- Fetch, display, and navigate profiles (previous/next history, saved to localStorage, last 50 kept)
- Skips profiles that already appear in the last 10 of your history
- Favorites with heart animation, saved to localStorage, view or remove from the Favorites panel
- Copy email and phone, plus `mailto:` and `tel:` links
- Skeleton loading, error state with retry, duplicate-request guard
- Light/dark theme (saved, follows system preference on first visit)
- Live stats: profiles this session, favorites saved, current country
- Keyboard: `Space` = new profile, `←` / `→` = history (ignored while a button or link is focused)
- Respects `prefers-reduced-motion`

## Structure

```
src/
├── components/   Navbar, Hero, ProfileCard, ProfileDetails, DetailItem, GenerateButton,
│                 ProfileNav, FavoritesPanel, StatsSection, LoadingState, ErrorState,
│                 ToastStack, Footer
├── services/userService.js    API fetching + response validation only
├── hooks/useLocalStorage.js   useState that persists to localStorage
├── utils/formatUser.js        raw API record -> UI-friendly object
├── utils/clipboard.js         copy helper with fallback
├── App.jsx                    state + composition
├── App.css / index.css        component styles / tokens and base styles
└── main.jsx
```

## Customising

- Colors, spacing, and radii are CSS variables at the top of `src/index.css` (light and dark sets).
- API query (nationalities, fields) is the `API_URL` constant in `src/services/userService.js`.
- History size and duplicate-check window are constants at the top of `src/App.jsx`.
