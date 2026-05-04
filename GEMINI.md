# Prompt2Data Project Instructions

## Project Overview
Prompt2Data is a web application designed to generate synthetic datasets for machine learning tasks from simple text prompts. It connects to various large language models (LLMs) via providers such as OpenRouter, Ollama, OpenAI, and Google Gemini. 

The application is built using:
- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Language**: JavaScript (JSX)

## Architecture & Structure
The project follows a standard React project structure:
- `src/components/`: Contains React components, organized by domain (e.g., `config`, `output`, `ui`).
- `src/hooks/`: Contains custom React hooks (e.g., `useGeneration.js`).
- `src/utils/`: Contains utility functions (e.g., `export.js` for JSON/CSV exports).
- `src/assets/`: Static assets like images.
- `public/`: Public static assets (favicon, icons).

## Building and Running
The project uses `npm` as its package manager. Key scripts available in `package.json`:

- **Development Server**: `npm run dev` (starts the Vite dev server, typically on port 5173).
- **Production Build**: `npm run build` (bundles the app using Vite).
- **Linting**: `npm run lint` (runs ESLint across the codebase).
- **Preview Build**: `npm run preview` (previews the production build locally).

## Configuration
- Environment variables are managed via a `.env` file (copied from `.env.example`).
- Key variables include `VITE_OPENROUTER_API_KEY`, `VITE_OPENAI_API_KEY`, and `VITE_GEMINI_API_KEY`.
- ESLint and Tailwind are configured in `eslint.config.js` and `tailwind.config.js`, respectively.

## Development Conventions
- **Components**: Write functional React components using hooks.
- **Styling**: Prefer Tailwind CSS utility classes over custom CSS.
- **State Management**: React state and custom hooks.
- **Code Formatting/Linting**: Adhere to the configured ESLint rules (`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`).
