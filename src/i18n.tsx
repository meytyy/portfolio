import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type Lang = 'ru' | 'en'
type Dict = Record<string, string>
type Packs = Record<Lang, Dict>

const packs: Packs = {
  ru: {
    page_title: 'Александр Седов — Портфолио',
    brand: 'ALEXANDER SEDOV',
    hero_badge: 'Frontend • Full-Stack • Product',
    hero_title: 'Привет, я Александр Седов — разработчик, который собирает быстрые и стильные продукты',
    hero_desc: 'Делаю сайты, интерфейсы, MVP и небольшие продукты на React / TypeScript и Python. Люблю минимализм, понятный UX и быстрый деплой.',
    btn_projects: 'Мои проекты',
    btn_contact: 'Связаться',
    nav_home: 'Главная',
    nav_skills: 'Скиллы',
    nav_projects: 'Проекты',
    nav_experience: 'Опыт',
    nav_education: 'Обучение',
    nav_contact: 'Контакты',
    section_skills: 'Skills',
    skills_hard: 'Hard skills',
    skills_soft: 'Soft skills',
    section_projects: 'Projects',
    section_experience: 'Опыт',
    section_education: 'Learning',
    contact_hint: 'Лучше всего писать в Telegram или на почту',
    footer: 'Portfolio',
    available_for_label: 'Available for',
    available_for_value: 'Portfolio sites, MVPs, tools',
    soft_1: 'Чистый и аккуратный UI',
    soft_2: 'Быстрый запуск MVP',
    soft_3: 'Адаптивная верстка',
    soft_4: 'Фокус на простоте и пользе',
    soft_5: 'Умение доводить до деплоя',
    exp_1_title: 'Full-Stack Developer',
    exp_1_place: 'Freelance / Personal products',
    exp_1_period: '2024 — now',
    exp_1_p1: 'Создаю веб-приложения, инструменты и MVP под запуск.',
    exp_1_p2: 'Работаю с React, TypeScript, Vite, Node.js и Python.',
    exp_1_p3: 'Упаковываю проекты под деплой на Netlify, Vercel и VPS.',
    exp_2_title: 'Product Builder',
    exp_2_place: 'Extensions, bots, landing pages',
    exp_2_period: '2024 — now',
    exp_2_p1: 'Делаю простые, быстрые и понятные интерфейсы.',
    exp_2_p2: 'Собираю pet-проекты под реальных пользователей и портфолио.',
    edu_1_title: 'WSB Merito University, Chorzów',
    edu_1_place: 'IT program (Polish), 1 year of study, not completed',
    edu_1_period: '2023 — 2024',
    edu_1_p1: 'Учился один год в университете WSB Merito в Хожуве на IT-направлении на польском языке.',
    edu_1_p2: 'Обучение не завершил, но получил практическую базу и продолжил развитие самостоятельно через реальные проекты.',
    edu_2_title: 'CS50',
    edu_2_place: 'Harvard / Self-Study',
    edu_2_period: '2023',
    edu_2_p1: 'Прошел CS50 в 2023 году.',
    edu_2_p2: 'Сильная база по computer science, логике программирования и работе с кодом.',
    edu_3_title: 'CS50P',
    edu_3_place: 'Harvard / Self-Study',
    edu_3_period: '2024',
    edu_3_p1: 'Прошел CS50P в 2024 году.',
    edu_3_p2: 'Отдельный акцент на Python, автоматизации и практических инструментах.',
    contact_desc: 'По вопросам сотрудничества, разработки сайтов, лендингов, MVP и интерфейсов — пиши в Telegram или на почту.',
    what_i_do: 'Что я делаю',
    what_i_do_1: 'Делаю аккуратные сайты и интерфейсы.',
    what_i_do_2: 'Готовлю проекты под деплой на Netlify/Vercel.',
    what_i_do_3: 'Собираю быстрые MVP и продуктовые прототипы.',
    proj_1_title: 'Quizzz',
    proj_1_tagline: 'Платформа для квизов с удобным созданием и запуском тестов',
    proj_1_desc: 'Веб-приложение для создания квизов, прохождения тестов и дальнейшего развития в сторону авторизации, лидербордов и сохранения прогресса.',
    proj_2_title: 'Focus Fox',
    proj_2_tagline: 'Pomodoro и focus-tool для концентрации и работы без отвлечений',
    proj_2_desc: 'Минималистичный productivity-проект с таймером, приятным интерфейсом и акцентом на концентрацию, привычки и deep work.',
    proj_3_title: 'Portfolio Website',
    proj_3_tagline: 'Персональный сайт-портфолио для презентации проектов и контактов',
    proj_3_desc: 'Адаптивный одностраничный сайт с темной темой, блоком проектов, фотографией, быстрыми ссылками и подготовкой под Netlify/Vercel.',
  },
  en: {
    page_title: 'Alexander Sedov — Portfolio',
    brand: 'ALEXANDER SEDOV',
    hero_badge: 'Frontend • Full-Stack • Product',
    hero_title: 'Hi, I’m Alexander Sedov — a developer building fast and stylish digital products',
    hero_desc: 'I build websites, interfaces, MVPs and small products with React / TypeScript and Python. I like minimal design, clear UX and fast deployment.',
    btn_projects: 'My projects',
    btn_contact: 'Contact me',
    nav_home: 'Home',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_education: 'Learning',
    nav_contact: 'Contact',
    section_skills: 'Skills',
    skills_hard: 'Hard skills',
    skills_soft: 'Soft skills',
    section_projects: 'Projects',
    section_experience: 'Experience',
    section_education: 'Learning',
    contact_hint: 'Best way to reach me is Telegram or email',
    footer: 'Portfolio',
    available_for_label: 'Available for',
    available_for_value: 'Portfolio sites, MVPs, tools',
    soft_1: 'Clean and polished UI',
    soft_2: 'Fast MVP delivery',
    soft_3: 'Responsive layouts',
    soft_4: 'Focus on simplicity and usefulness',
    soft_5: 'Ability to take projects to deployment',
    exp_1_title: 'Full-Stack Developer',
    exp_1_place: 'Freelance / Personal products',
    exp_1_period: '2024 — now',
    exp_1_p1: 'I build web apps, tools and MVPs for launch-ready use cases.',
    exp_1_p2: 'I work with React, TypeScript, Vite, Node.js and Python.',
    exp_1_p3: 'I prepare projects for deployment on Netlify, Vercel and VPS.',
    exp_2_title: 'Product Builder',
    exp_2_place: 'Extensions, bots, landing pages',
    exp_2_period: '2024 — now',
    exp_2_p1: 'I design simple, fast and intuitive interfaces.',
    exp_2_p2: 'I ship pet projects for real users and portfolio growth.',
    edu_1_title: 'WSB Merito University, Chorzów',
    edu_1_place: 'IT program (Polish), 1 year of study, not completed',
    edu_1_period: '2023 — 2024',
    edu_1_p1: 'Studied for one year at WSB Merito University in Chorzów in an IT program taught in Polish.',
    edu_1_p2: 'Did not complete the degree, but gained a practical foundation and continued learning through real projects.',
    edu_2_title: 'CS50',
    edu_2_place: 'Harvard / Self-Study',
    edu_2_period: '2023',
    edu_2_p1: 'Completed CS50 in 2023.',
    edu_2_p2: 'Built a solid base in computer science, programming logic and working with code.',
    edu_3_title: 'CS50P',
    edu_3_place: 'Harvard / Self-Study',
    edu_3_period: '2024',
    edu_3_p1: 'Completed CS50P in 2024.',
    edu_3_p2: 'Special focus on Python, automation and practical tools.',
    contact_desc: 'For collaboration, websites, landing pages, MVPs and interface work — message me on Telegram or by email.',
    what_i_do: 'What I do',
    what_i_do_1: 'I build clean websites and interfaces.',
    what_i_do_2: 'I prepare projects for Netlify/Vercel deployment.',
    what_i_do_3: 'I ship fast MVPs and product prototypes.',
    proj_1_title: 'Quizzz',
    proj_1_tagline: 'A quiz platform with convenient test creation and launch flow',
    proj_1_desc: 'A web app for creating quizzes, taking tests and expanding toward authentication, leaderboards and progress saving.',
    proj_2_title: 'Focus Fox',
    proj_2_tagline: 'A pomodoro and focus tool for concentration and distraction-free work',
    proj_2_desc: 'A minimalist productivity project with a timer, clean interface and a strong focus on concentration, habits and deep work.',
    proj_3_title: 'Portfolio Website',
    proj_3_tagline: 'A personal portfolio website for showcasing projects and contacts',
    proj_3_desc: 'A responsive one-page website with a dark theme, project section, portrait photo, quick links and deployment setup for Netlify/Vercel.',
  },
}

type Ctx = { lang: Lang; t: (key: string) => string; toggle: () => void }
const I18nCtx = createContext<Ctx>({ lang: 'ru', t: (k) => k, toggle: () => {} })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
  }, [])
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = packs[lang].page_title
  }, [lang])
  const t = (key: string) => (packs[lang] && packs[lang][key]) || key
  const toggle = () =>
    setLang((l) => {
      const next = l === 'ru' ? 'en' : 'ru'
      localStorage.setItem('lang', next)
      return next
    })
  return <I18nCtx.Provider value={{ lang, t, toggle }}>{children}</I18nCtx.Provider>
}

export const useI18n = () => useContext(I18nCtx)
