# Task Manager (React + TypeScript)

Одностраничное приложение (SPA) для управления задачами с возможностью создавать, редактировать, удалять и просматривать статус задач

В проект создан с использованием следующего стека:

- React 18+ (функциональные компоненты и хуки)
- TypeScript
- UI библиотека: MUI
- React Router v6
- Формы и валидация: react-hook-form + zod
- Работа с данными: JSON Server + RTK Query
- Сборка: Vite
- Тестирование: Vitest
- Storybook

## 🚀 Запуск проекта

### 1. Настройка базы данных

Проект использует `json-server` для имитации REST API. Для работы необходимо создать файл `db.json` в корне проекта.

**Важно:** Файл `db.json` не включён в репозиторий, так как содержит сгенерированные данные.

```bash
# Скопируйте пример файла и переименуйте его
cp db.example.json db.json
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск приложения

```bash
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
npm run test      # тесты
npm run storybook

```
