# UDT GameHub

A game discovery app built with React and the [RAWG Video Games Database API](https://rawg.io/apidocs). Browse games by genre and platform, search by title, and sort by rating, release date, or name.

## Features

- Browse games by genre and platform
- Search by game title
- Sort by relevance, date added, name, release date, popularity, or rating
- Hero carousel showcasing top-rated games
- Game detail modal with description, publishers, and website
- Light and dark mode
- Responsive layout

## Tech Stack

- **React 19** with TypeScript
- **Vite** for bundling
- **Chakra UI** for components and theming
- **Axios** for API requests
- **React Icons** for platform and UI icons
- **Framer Motion** for animations

## Getting Started

### Prerequisites

- Node.js 18+
- A free API key from [rawg.io](https://rawg.io/apidocs)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/udithsc/udt-game-hub.git
   cd udt-game-hub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   VITE_RAWG_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Project Structure

```
src/
├── components/       # UI components
├── hooks/            # Custom React hooks (data fetching)
├── services/         # Axios client and image URL helper
├── data/             # Static genre and platform data
├── assets/           # Images and static files
├── theme.ts          # Chakra UI theme configuration
└── App.tsx           # Root component and layout
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_RAWG_API_KEY` | Your RAWG API key |
