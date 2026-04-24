# Task Manager (React + TypeScript)

Проект создан по требованиям:

- React 18+ (функциональные компоненты и хуки)
- TypeScript
- UI библиотека: MUI
- React Router v6
- Формы и валидация: react-hook-form + zod
- Работа с данными: JSON Server + RTK Query
- Сборка: Vite

## Запуск

```bash
npm install
npm run dev:full
```

Команда `dev:full` запускает одновременно:

- фронтенд на `http://localhost:5173`
- JSON Server на `http://localhost:3001`

## Доступные команды

```bash
npm run dev       # только Vite
npm run server    # только JSON Server
npm run dev:full  # Vite + JSON Server
npm run lint
npm run build
```
