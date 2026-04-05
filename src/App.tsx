import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Github,
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

const nav = [
  { id: 'home', labelKey: 'nav_home' },
  { id: 'skills', labelKey: 'nav_skills' },
  { id: 'projects', labelKey: 'nav_projects' },
  { id: 'experience', labelKey: 'nav_experience' },
  { id: 'education', labelKey: 'nav_education' },
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
    <div className="font-sans bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
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
              <button onClick={toggle} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Language">
                <Globe size={18} />
              </button>
              <a href="https://github.com/meytyy" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="GitHub"><Github size={18} /></a>
              <button onClick={() => setDark((d) => !d)} className="p-2 rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60 transition" aria-label="Theme">
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
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
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 hover:shadow-soft hover:dark:shadow-softdark transition">
                <Rocket size={16} /> {t('btn_projects')}
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:translate-y-[-1px] transition">
                {t('btn_contact')} <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm opacity-70">
              <div className="flex items-center gap-2"><Code2 size={16} /> React / TypeScript</div>
              <div className="flex items-center gap-2"><TerminalSquare size={16} /> Vite / Node / Python</div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="relative">
            <div className="rounded-[28px] border border-neutral-200 dark:border-neutral-800 shadow-soft dark:shadow-softdark overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img src="/profile.jpg" alt="Profile" className="h-[520px] w-full object-cover object-center" />
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
                <li key={s} className="rounded-full border border-neutral-300 dark:border-neutral-700 px-3 py-1">{s}</li>
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
        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:shadow-soft dark:hover:shadow-softdark transition">
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img src={p.preview} alt={p.title} className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.03]" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="opacity-70 text-sm mt-1">{p.tagline}</p>
                  </div>
                  <ExternalLink size={18} className="opacity-50 shrink-0" />
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
            </div>
            <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-300">
              {t('contact_desc')}
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="opacity-70 text-sm">{t('what_i_do')}</div>
            <ul className="mt-3 list-disc pl-5 text-sm space-y-2">
              <li>{t('what_i_do_1')}</li>
              <li>{t('what_i_do_2')}</li>
              <li>{t('what_i_do_3')}</li>
            </ul>
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
