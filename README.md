# TaskFlow To-Do List

A beginner-friendly React and Vite project for organizing daily tasks. Supabase
Authentication manages accounts and the Supabase `tasks` table stores tasks.

## Getting started

1. Install the project dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local URL printed by Vite in your browser.

## Project structure

- `src/components/` contains reusable dashboard and task components.
- `src/pages/` contains page-level components.
- `src/context/` and `src/hooks/` contain shared task state and its hook.
- `src/services/` and `src/utils/` contain task operations and helpers.
- `src/styles/variables.css` contains shared design tokens.

## Included features

- Create, edit, complete, and delete tasks.
- Add descriptions, categories, due dates, and priorities.
- Search tasks and filter by status, date, or category.
- View task counts and completion progress.
- Keep account tasks available across devices and browser sessions.

## Task data and ownership

The app loads, inserts, updates, and deletes rows from the Supabase `tasks`
table. Every task request is scoped to the signed-in user's ID, and database
Row Level Security policies should also enforce ownership. The table is expected
to include `id`, `user_id`, `title`, `description`, `category`, `due_date`,
`priority`, and `is_completed` columns. The frontend maps the database
`is_completed` value to its internal `completed` property.

Tasks previously saved under the `taskflow-tasks` browser localStorage key are
left untouched. They are not imported automatically because the browser data
may belong to a different account. Keep that data until you choose to implement
an explicit, account-confirmed migration.
