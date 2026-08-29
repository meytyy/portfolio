import type { Lang } from './i18n'

export type Project = {
  title: string
  tagline: string
  description: string
  stack: string[]
  images: string[]
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
      images: ['/previews/quizzz-upload-preview.svg', '/previews/quizzz-preview.svg'],
      links: [{ type: 'github', href: 'https://github.com/meytyy/quizzz' }],
    },
    {
      title: 'Onda CRM',
      tagline:
        lang === 'ru'
          ? 'CRM-система для управления салоном красоты и записями клиентов'
          : 'A CRM system for beauty salon operations and client appointments',
      description:
        lang === 'ru'
          ? 'Рабочее пространство для записи клиентов, управления расписанием сотрудников, напоминаний, выручки, загрузки и аналитики салона.'
          : 'A workspace for client bookings, employee schedules, reminders, revenue, occupancy and salon analytics.',
      stack: ['React', 'TypeScript', 'CRM', 'Analytics'],
      images: [
        '/projects/onda/dashboard.jpg',
        '/projects/onda/calendar.jpg',
        '/projects/onda/appointment-form.jpg',
        '/projects/onda/appointment-details.jpg',
        '/projects/onda/analytics.jpg',
      ],
      links: [],
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
      images: ['/profile.jpg'],
      links: [
        { type: 'demo', href: '#' },
        { type: 'github', href: 'https://github.com/meytyy' },
      ],
    },
  ]
}
