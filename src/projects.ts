export type Project = {
  title: string
  tagline: string
  stack: string[]
  links: { type: 'github' | 'demo', href: string }[]
}

export const projects: Project[] = [
  {
    title: 'FocusFox — браузерное расширение',
    tagline: 'Pomodoro + блокировщик отвлечений, статистика по доменам',
    stack: ['MV3','React','TypeScript','Tailwind','WebExtensions'],
    links: [
      { type: 'github', href: 'https://github.com/meytyy/focusfox' },
    ]
  },
  {
    title: 'ReaderList — список для чтения',
    tagline: 'Reader Mode, прогресс чтения, экспорт/импорт',
    stack: ['React','TypeScript','Tailwind','Framer Motion'],
    links: [
      { type: 'github', href: 'https://github.com/meytyy/readerlist' },
    ]
  },
  {
    title: 'SaaS-шаблон',
    tagline: 'Авторизация, биллинг (mock), роли, UI-компоненты',
    stack: ['React','Vite','Tailwind','Node'],
    links: [
      { type: 'demo', href: '#' },
    ]
  },
]
