import type { Lang } from './i18n'

export type Project = {
  title: string
  tagline: string
  description: string
  stack: string[]
  preview: string
  links: { type: 'github' | 'demo', href: string }[]
}

export function getProjects(lang: Lang): Project[] {
  return [
    {
      title: 'Quizzz',
      tagline:
        lang === 'ru'
          ? 'Платформа для квизов с удобным созданием и запуском тестов'
          : 'A quiz platform with convenient test creation and launch flow',
      description:
        lang === 'ru'
          ? 'Веб-приложение для создания квизов, прохождения тестов и дальнейшего развития в сторону авторизации, лидербордов и сохранения прогресса.'
          : 'A web app for creating quizzes, taking tests and expanding toward authentication, leaderboards and progress saving.',
      stack: ['React', 'TypeScript', 'Vite', 'Quiz Builder'],
      preview: '/previews/quizzz-preview.svg',
      links: [{ type: 'github', href: 'https://github.com/meytyy/quizzz' }],
    },
    {
      title: 'Focus Fox',
      tagline:
        lang === 'ru'
          ? 'Pomodoro и focus-tool для концентрации и работы без отвлечений'
          : 'A pomodoro and focus tool for concentration and distraction-free work',
      description:
        lang === 'ru'
          ? 'Минималистичный productivity-проект с таймером, приятным интерфейсом и акцентом на концентрацию, привычки и deep work.'
          : 'A minimalist productivity project with a timer, clean interface and a strong focus on concentration, habits and deep work.',
      stack: ['React', 'TypeScript', 'Vite', 'Productivity'],
      preview: '/previews/focus-fox-preview.svg',
      links: [{ type: 'github', href: 'https://github.com/meytyy/focus-fox' }],
    },
    {
      title: 'Portfolio Website',
      tagline:
        lang === 'ru'
          ? 'Персональный сайт-портфолио для презентации проектов и контактов'
          : 'A personal portfolio website for showcasing projects and contacts',
      description:
        lang === 'ru'
          ? 'Адаптивный одностраничный сайт с темной темой, блоком проектов, фотографией, быстрыми ссылками и подготовкой под Netlify/Vercel.'
          : 'A responsive one-page website with a dark theme, project section, portrait photo, quick links and deployment setup for Netlify/Vercel.',
      stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
      preview: '/profile.jpg',
      links: [
        { type: 'demo', href: '#' },
        { type: 'github', href: 'https://github.com/meytyy' },
      ],
    },
  ]
}
