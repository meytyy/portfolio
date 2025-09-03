
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Lang = 'ru' | 'en'
type Dict = Record<string, string>
type Packs = Record<Lang, Dict>

const packs: Packs = {
  ru: {
    hero_title: "Привет, я Alex — Full‑Stack разработчик",
    hero_desc: "Мне 19. Пишу на Python, JavaScript/TypeScript, работаю с React (Vite/Next), делаю чистые интерфейсы и настраиваю DevOps‑пайплайны.",
    btn_projects: "Мои проекты",
    btn_contact: "Связаться",
    btn_cv: "CV (pdf)",
    nav_home: "Главная",
    nav_skills: "Скиллы",
    nav_projects: "Проекты",
    nav_experience: "Опыт",
    nav_education: "Образование",
    nav_blog: "Блог",
    nav_contact: "Контакты",
    skills_hard: "Hard skills",
    skills_soft: "Soft skills",
    section_projects: "Проекты",
    section_experience: "Опыт",
    section_education: "Образование",
    section_blog: "Блог / Кейсы",
    section_contact: "Контакты",
    contact_hint: "Пишите в Telegram или на почту",
    cooperation_hint: "Коротко о сотрудничестве",
    cooperation_1: "Быстрые превью и MVP за 1–3 дня",
    cooperation_2: "Чистый код, понятные README и скрипты",
    cooperation_3: "Дизайн «как у Apple»: ч/б, воздух, акценты",
    footer: "Портфолио"
  },
  en: {
    hero_title: "Hi, I'm Alex — Full‑Stack Developer",
    hero_desc: "I'm 19. I build with Python and JavaScript/TypeScript, ship clean React UIs and set up DevOps pipelines.",
    btn_projects: "Projects",
    btn_contact: "Contact",
    btn_cv: "CV (pdf)",
    nav_home: "Home",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_experience: "Experience",
    nav_education: "Education",
    nav_blog: "Blog",
    nav_contact: "Contact",
    skills_hard: "Hard skills",
    skills_soft: "Soft skills",
    section_projects: "Projects",
    section_experience: "Experience",
    section_education: "Education",
    section_blog: "Blog / Case studies",
    section_contact: "Contact",
    contact_hint: "DM me on Telegram or send an email",
    cooperation_hint: "How I work",
    cooperation_1: "Rapid MVPs in 1–3 days",
    cooperation_2: "Clean code, clear README & scripts",
    cooperation_3: "Apple‑like minimal design",
    footer: "Portfolio"
  }
}

type Ctx = { lang: Lang, t: (key: string) => string, toggle: () => void }
const I18nCtx = createContext<Ctx>({ lang: 'ru', t: (k) => k, toggle: () => {} })

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved) setLang(saved)
  }, [])
  const t = (key: string) => (packs[lang] && packs[lang][key]) || key
  const toggle = () => setLang(l => {
    const next = l === 'ru' ? 'en' : 'ru'
    localStorage.setItem('lang', next)
    return next
  })
  return <I18nCtx.Provider value={{ lang, t, toggle }}>{children}</I18nCtx.Provider>
}

export const useI18n = () => useContext(I18nCtx)
