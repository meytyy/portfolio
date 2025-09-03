
import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Github, Mail, Send, ArrowUpRight, Moon, Sun, Download, TerminalSquare, Rocket, Code2, Globe } from 'lucide-react'
import { projects } from './projects'
import { I18nProvider, useI18n } from './i18n'
import { Timeline } from './components/Timeline'
import { ContactForm } from './components/ContactForm'
import { BlogSection } from './Blog'

type NavItem = { id: string, labelKey: string }
const nav: NavItem[] = [
  { id: 'home', labelKey: 'nav_home' },
  { id: 'skills', labelKey: 'nav_skills' },
  { id: 'projects', labelKey: 'nav_projects' },
  { id: 'experience', labelKey: 'nav_experience' },
  { id: 'education', labelKey: 'nav_education' },
  { id: 'blog', labelKey: 'nav_blog' },
  { id: 'contact', labelKey: 'nav_contact' },
]

function Shell() {
  const [dark, setDark] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const { t, toggle, lang } = useI18n()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefersDark)
  }, [])

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const experience = [
    {
      title: "Full‑Stack разработчик (фриланс) / Full‑Stack Developer",
      place: "Web‑apps, SaaS, расширения браузера",
      period: "2024 — наст. время",
      points: [
        "React + TS (Vite/Next), Tailwind, Framer Motion",
        "Node/Express, FastAPI; PostgreSQL/Mongo",
        "DevOps: Docker, Nginx/Traefik, GitHub Actions (CI/CD), деплой на VPS/Pages",
      ]
    },
    {
      title: "IT Support (5★ отель)",
      place: "Инфраструктура и поддержка, автоматизация рутин",
      period: "2023 — 2024",
      points: [
        "Поддержка внутренних систем, документация",
        "Скрипты для рутинных задач, мониторинг"
      ]
    },
    {
      title: "Open‑source",
      place: "FocusFox, ReaderList",
      period: "2025 — наст. время",
      points: [
        "Публикация и поддержка side‑проектов",
        "Вовлечение пользователей и сбор обратной связи"
      ]
    }
  ]

  const education = [
    {
      title: "CS50 (Harvard) — Computer Science",
      place: "онлайн, сертификат",
      period: "2024",
      points: [
        "Алгоритмы, структуры данных, C/Python, проектная работа"
      ]
    },
    {
      title: "WSB Merito University (Chorzów) — Informatyka",
      place: "Польша, 1 год обучения",
      period: "2023 — 2024",
      points: [
        "Основы инженерии ПО, базы данных, веб‑технологии"
      ]
    },
    {
      title: "Self‑study — DevOps & System Design",
      place: "Pet‑практики и мини‑лабы",
      period: "2024 — наст. время",
      points: [
        "Docker, Compose, CI/CD, базовый Kubernetes",
        "Системный дизайн, шаблоны масштабирования"
      ]
    }
  ]

  return (
    <div className="font-sans">
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-black/80 dark:bg-white/80 z-50" />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" width="20" height="20" alt="A" className="rounded-md"/>
              <button onClick={() => scrollToId('home')} className="text-sm font-bold tracking-wide">ALEX</button>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {nav.map(n => (
                <button key={n.id} onClick={() => scrollToId(n.id)} className="opacity-80 hover:opacity-100 transition link-underline">
                  {t(n.labelKey)}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button onClick={toggle} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Lang">
                <Globe size={18}/> <span className="sr-only">Lang</span>
              </button>
              <a href="https://github.com/meytyy" target="_blank" className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="GitHub"><Github size={18} /></a>
              <button onClick={() => setDark(d => !d)} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Theme">
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}
              className="text-4xl md:text-6xl font-extrabold leading-[1.1]">{t('hero_title')}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6 }}
              className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">{t('hero_desc')}</motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 hover:shadow-soft hover:dark:shadow-softdark transition">
                <Rocket size={16}/> {t('btn_projects')}
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:translate-y-[-1px] transition">
                {t('btn_contact')} <ArrowUpRight size={16}/>
              </a>
              <a href="/cv.pdf" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2">
                <Download size={16}/> {t('btn_cv')}
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm opacity-70">
              <div className="flex items-center gap-2"><Code2 size={16}/> Full‑Stack / DevOps</div>
              <div className="flex items-center gap-2"><TerminalSquare size={16}/> Node / Python</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale:.98 }} whileInView={{ opacity: 1, scale:1 }} transition={{ duration:.6 }} viewport={{ once:true }} className="relative">
            <div className="aspect-video rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-soft dark:shadow-softdark bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950" />
            <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(transparent,black)]" />
          </motion.div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-6">Скиллы / Skills</motion.h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold mb-3 opacity-80">{t('skills_hard')}</h3>
            <ul className="flex flex-wrap gap-2 text-sm">
              {['JavaScript','TypeScript','React','Vite','Next.js','TailwindCSS','Node.js','Express','Python','FastAPI','PostgreSQL','MongoDB','Git','Docker','CI/CD','Nginx','Traefik'].map(s => (
                <li key={s} className="rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 opacity-80">{t('skills_soft')}</h3>
            <ul className="grid gap-2 text-sm list-disc pl-5">
              {['Коммуникация и эмпатия / Communication','Чистый код и внимание к деталям / Craft & detail','Инициативность и ответственность / Ownership','Обучаемость / Fast learner','Работа в неопределённости / Ambiguity'].map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-8">{t('section_projects')}</motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.article key={p.title} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-soft dark:hover:shadow-softdark transition">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="opacity-70 text-sm mt-1">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map(s => <span key={s} className="rounded-full border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-xs">{s}</span>)}
              </div>
              <div className="mt-4 flex gap-3">
                {p.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" className="inline-flex items-center gap-1 text-sm link-underline">
                    {l.type === 'github' ? <Github size={16}/> : <ArrowUpRight size={16}/>} {l.type}
                  </a>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-6">{t('section_experience')}</motion.h2>
        <Timeline items={experience} />
      </section>

      <section id="education" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-6">{t('section_education')}</motion.h2>
        <Timeline items={education} />
      </section>

      <section id="blog" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-6">{t('section_blog')}</motion.h2>
        <BlogSection />
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-2xl md:text-3xl font-bold mb-6">{t('nav_contact')}</motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="opacity-70 text-sm">{t('contact_hint')}</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="https://t.me/sedovq" target="_blank"><Send size={16}/> @sedovq</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="mailto:ssddsss1337@gmail.com"><Mail size={16}/> ssddsss1337@gmail.com</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="tel:+905375083191">+90 537 508 31 91</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="https://github.com/meytyy" target="_blank"><Github size={16}/> GitHub</a>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="opacity-70 text-sm">Коротко</div>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
              <li>Full‑Stack + DevOps: от прототипа до продакшена</li>
              <li>CI/CD, Docker, серверы на VPS, мониторинг</li>
              <li>Минималистичный дизайн и производительность</li>
            </ul>
          </div>
        </div>
        <footer className="mt-12 py-6 text-center opacity-60 text-sm">© {new Date().getFullYear()} Alex — {t('footer')}</footer>
      </section>
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  )
}
