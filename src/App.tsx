import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import {
  Github,
  Linkedin,
  Mail,
  Send,
  ArrowUpRight,
  Moon,
  Sun,
  TerminalSquare,
  Rocket,
  Code2,
  Globe,
  ExternalLink,
} from 'lucide-react'
import { getProjects } from './projects'
import { I18nProvider, useI18n } from './i18n'
import { Timeline } from './components/Timeline'
import { ContactForm } from './components/ContactForm'
import { ProjectCarousel } from './components/ProjectCarousel'

const LINKEDIN_URL = 'https://www.linkedin.com/in/alexander-sedov-768081428/'

const nav = [
  { id: 'home', labelKey: 'nav_home' },
  { id: 'skills', labelKey: 'nav_skills' },
  { id: 'projects', labelKey: 'nav_projects' },
  { id: 'experience', labelKey: 'nav_experience' },
  { id: 'education', labelKey: 'nav_education' },
  { id: 'contact', labelKey: 'nav_contact' },
]

function Shell() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [themeBurst, setThemeBurst] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const { t, toggle, lang } = useI18n()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  function toggleTheme() {
    document.documentElement.classList.add('theme-transition')
    setDark((value) => !value)
    setThemeBurst((value) => value + 1)
    window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 700)
  }

  function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const experience = useMemo(
    () => [
      {
        title: t('exp_1_title'),
        place: t('exp_1_place'),
        period: t('exp_1_period'),
        points: [t('exp_1_p1'), t('exp_1_p2'), t('exp_1_p3')],
      },
      {
        title: t('exp_2_title'),
        place: t('exp_2_place'),
        period: t('exp_2_period'),
        points: [t('exp_2_p1'), t('exp_2_p2')],
      },
    ],
    [t],
  )

  const education = useMemo(
    () => [
      {
        title: t('edu_1_title'),
        place: t('edu_1_place'),
        period: t('edu_1_period'),
        points: [t('edu_1_p1'), t('edu_1_p2')],
      },
      {
        title: t('edu_2_title'),
        place: t('edu_2_place'),
        period: t('edu_2_period'),
        points: [t('edu_2_p1'), t('edu_2_p2')],
      },
      {
        title: t('edu_3_title'),
        place: t('edu_3_place'),
        period: t('edu_3_period'),
        points: [t('edu_3_p1'), t('edu_3_p2')],
      },
    ],
    [t],
  )

  const softSkills = [t('soft_1'), t('soft_2'), t('soft_3'), t('soft_4'), t('soft_5')]
  const projects = useMemo(() => getProjects(lang), [lang])

  return (
    <div className="site-shell min-h-screen overflow-x-hidden font-sans bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
      <motion.div
        className="fixed inset-0 z-[90] origin-top bg-neutral-950 pointer-events-none dark:bg-white"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
      />
      <AnimatePresence>
        {themeBurst > 0 && (
          <motion.div
            key={themeBurst}
            className="fixed inset-0 z-[70] pointer-events-none"
            style={{
              background: dark
                ? 'radial-gradient(circle at calc(100% - 32px) 28px, rgba(255,255,255,.7), rgba(255,255,255,0) 42%)'
                : 'radial-gradient(circle at calc(100% - 32px) 28px, rgba(10,10,10,.65), rgba(10,10,10,0) 42%)',
            }}
            initial={{ opacity: 0.75, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-black/80 dark:bg-white/80 z-50" />

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" width="20" height="20" alt="Logo" className="rounded-md" />
              <button onClick={() => scrollToId('home')} className="text-sm font-bold tracking-wide">{t('brand')}</button>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {nav.map((n) => (
                <button key={n.id} onClick={() => scrollToId(n.id)} className="opacity-80 hover:opacity-100 transition link-underline">
                  {t(n.labelKey)}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <motion.button whileTap={{ scale: 0.82, rotate: -18 }} onClick={toggle} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Language">
                <Globe size={18} />
              </motion.button>
              <a href="https://github.com/meytyy" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="GitHub"><Github size={18} /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <motion.button whileTap={{ scale: 0.78 }} onClick={toggleTheme} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Theme">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={dark ? 'sun' : 'moon'} initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.22 }} className="block">
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">
              {t('hero_badge')}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-5 text-4xl md:text-6xl font-extrabold leading-[1.05]">
              {t('hero_title')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-5 text-lg text-neutral-600 dark:text-neutral-300 max-w-xl">
              {t('hero_desc')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 hover:shadow-soft hover:dark:shadow-softdark transition">
                <Rocket size={16} /> {t('btn_projects')}
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:translate-y-[-1px] transition">
                {t('btn_contact')} <ArrowUpRight size={16} />
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.28, duration: 0.7 }} className="mt-6 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2"><Code2 size={16} /> React / TypeScript</div>
              <div className="flex items-center gap-2"><TerminalSquare size={16} /> Vite / Node / Python</div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} whileHover={{ scale: 1.015, rotate: -0.35 }} transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <div className="group rounded-[28px] border border-neutral-200 dark:border-neutral-800 shadow-soft dark:shadow-softdark overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img src="/profile.jpg" alt="Alexander Sedov" className="h-[520px] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]" />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur px-4 py-3 shadow-soft dark:shadow-softdark">
              <div className="text-xs uppercase tracking-[0.2em] opacity-60">{t('available_for_label')}</div>
              <div className="mt-1 text-sm font-medium">{t('available_for_value')}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-6">{t('section_skills')}</motion.h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold mb-3 opacity-80">{t('skills_hard')}</h3>
            <ul className="flex flex-wrap gap-2 text-sm">
              {['JavaScript', 'TypeScript', 'React', 'Vite', 'TailwindCSS', 'Framer Motion', 'Node.js', 'Express', 'Python', 'FastAPI', 'Git', 'Docker', 'Netlify', 'Vercel'].map((s) => (
                <motion.li whileHover={{ y: -3, scale: 1.04 }} transition={{ type: 'spring', stiffness: 420, damping: 20 }} key={s} className="rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1 bg-white/40 dark:bg-neutral-950/40">{s}</motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 opacity-80">{t('skills_soft')}</h3>
            <ul className="grid gap-2 text-sm list-disc pl-5">
              {softSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-8">{t('section_projects')}</motion.h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((p, index) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 42, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} whileHover={{ y: -7 }} transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true, amount: 0.18 }} className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 hover:shadow-soft dark:hover:shadow-softdark">
              <ProjectCarousel images={p.images} title={p.title} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="opacity-70 text-sm mt-1">{p.tagline}</p>
                  </div>
                  {p.links.length > 0 && <ExternalLink size={18} className="opacity-50 shrink-0" />}
                </div>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 text-xs">{s}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a key={l.href + l.type} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition">
                      {l.type === 'github' ? <Github size={16} /> : <ArrowUpRight size={16} />} {l.type}
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-6">{t('section_experience')}</motion.h2>
        <Timeline items={experience} />
      </section>

      <section id="education" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-6">{t('section_education')}</motion.h2>
        <Timeline items={education} />
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-3xl font-bold mb-6">{t('nav_contact')}</motion.h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="opacity-70 text-sm">{t('contact_hint')}</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="https://t.me/sedovq" target="_blank" rel="noreferrer"><Send size={16} /> @sedovq</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="mailto:ssddsss1337@gmail.com"><Mail size={16} /> ssddsss1337@gmail.com</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href="https://github.com/meytyy" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              <a className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 link-underline" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
            </div>
            <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-300">
              {t('contact_desc')}
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6">
            <h3 className="font-semibold text-lg mb-4">{t('contact_form_title')}</h3>
            <ContactForm />
          </div>
        </div>
        <footer className="mt-12 py-6 text-center opacity-60 text-sm">© {new Date().getFullYear()} Alexander Sedov — {t('footer')}</footer>
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
