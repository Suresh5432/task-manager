# TaskPilot — Task Management Dashboard

TaskPilot is a responsive task-management dashboard built with React and Vite. It provides a frontend interface for organizing tasks and projects, monitoring progress, and reviewing recent activity. App data is stored in the browser using `localStorage`; no backend is required for the current frontend-only version.

## Features

- **Dashboard overview** — summary cards for total tasks, completed tasks, in-progress tasks, and overdue tasks.
- **Task management** — create, edit, delete, search, filter, sort, paginate, and update task status.
- **Task details** — view task information and its current status.
- **Project management** — create and delete projects, view project progress, and associate tasks with projects.
- **Calendar** — view tasks by due date.
- **Task progress** — visualize completed, in-progress, and to-do task counts with a circular progress indicator and progress bars.
- **Recent activity and notifications** — review task activity and manage notification read status.
- **Inbox and integrations pages** — frontend screens for messages and integration preferences.
- **Settings** — update workspace/profile preferences, theme, compact mode, and default task values.
- **Persistent browser storage** — tasks, projects, activities, notifications, and settings are retained in `localStorage` on the current browser.
- **Responsive layout** — dashboard layout adapts to smaller screen sizes.

## Tech Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- JavaScript (ES modules)
- CSS
- `localStorage` for client-side persistence
- Ant Design icons, React Icons, and Ant Design packages are included in dependencies

## Requirements

- Node.js compatible with the installed Vite version
- npm

Check your installed versions:

```bash
node --version
npm --version
```

## Getting Started

1. **Extract the project ZIP** and open a terminal in the `task-manager` directory.

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal by Vite (usually `http://localhost:5173`).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run Oxlint checks. |

## Project Structure

```text
task-manager/
├── public/                  # Public static assets
├── src/
│   ├── assets/               # Images and static assets
│   ├── components/           # Sidebar, task/project views, modals, panels, pages
│   ├── data/
│   │   └── initialProjects.js # Initial project data
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── utils/
│   │   └── taskUtils.js      # Task statistics and helpers
│   ├── App.jsx
│   ├── index.css             # Main consolidated stylesheet
│   └── main.jsx              # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Data and Storage

This is currently a **frontend-only project**. It does not require a database, API server, or account service. The app saves its data in the browser's `localStorage`, including task, project, activity, notification, and settings data. This means data is specific to the browser and origin where the app is used; clearing browser storage or using another browser may remove or hide that data.

## Styling

The main stylesheet is `src/index.css`. It contains the dashboard layout, sidebar, task and project cards, modals, progress visuals, theme styles, and responsive breakpoints. Keep component class names in sync with this file when modifying the UI.

## Production Build

Run:

```bash
npm run build
```

Vite writes the production assets to the `dist/` directory. To serve that build locally for a quick check:

```bash
npm run preview
```

## Current Limitations

- Data is stored locally in the browser and is not synchronized between users or devices.
- Inbox and integrations are frontend screens; actual external-service connections are not configured by this README.
- Authentication, backend APIs, and server-side storage are not included in this frontend-only version.

## License

No license has been specified yet. Add a `LICENSE` file before redistributing the project if you want to define usage terms.