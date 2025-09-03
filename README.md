# Портфолио — Саша (React + Vite + TypeScript + Tailwind)

Минималистичный сайт «как у Apple»: ч/б стиль, чистая сетка, плавные анимации (Framer Motion).

## Быстрый старт
```bash
# 1) Установи Node.js >= 18 (https://nodejs.org)
# 2) Установка зависимостей
npm i

# 3) Запуск в dev-режиме
npm run dev
# Открой URL из терминала (обычно http://localhost:5173)

# 4) Прод-сборка
npm run build
npm run preview
```

## Стек
- React 18 + TypeScript + Vite
- TailwindCSS 3 (darkMode: 'class')
- Framer Motion (анимации)
- Lucide icons

## Структура
```
src/
  App.tsx        # страница с секциями
  main.tsx       # вход
  styles.css     # tailwind
  projects.ts    # данные для карточек проектов
```

## Кастомизация
- Ссылки в шапке/контактах: `App.tsx` (GitHub/Telegram/email)
- Проекты: `src/projects.ts`
- Тёмная тема: иконка в шапке или system preference


## i18n
Есть переключатель языков (RU/EN) — иконка глобуса в шапке.

## Timeline (Опыт/Образование)
Секции добавлены в `App.tsx` через компонент `Timeline`.

## Блог на MDX
Файлы в `src/posts/*.mdx`. Метаданные задаются экспортом `meta`:
```mdx
export const meta = { title: "Заголовок", date: "2025-01-15" }
# Заголовок
Текст...
```

## Контакт‑форма (Email/Telegram)
Локальный сервер на Express обрабатывает `/api/contact` и шлёт:
- **Telegram** через Bot API (нужны `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`)
- **Email** через Gmail (нужны `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`)

.env пример: `.env.example`

### Запуск с сервером
```bash
npm i
cp .env.example .env   # заполни переменные
npm run dev:full       # запустит API и Vite вместе
```
