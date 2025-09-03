# Портфолио — Alex (React + Vite + TypeScript + Tailwind)



## Быстрый старт
```bash

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

