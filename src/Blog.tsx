
// Simple blog section that lists MDX posts and renders inline
// Each MDX should export `meta = { title: string, date?: string }`
import { useState } from 'react'

type PostMod = { default: any, meta?: {title: string, date?: string} }
const modules = import.meta.glob('./posts/*.mdx', { eager: true }) as Record<string, PostMod>

const entries = Object.entries(modules).map(([path, mod]) => ({
  path,
  Component: mod.default,
  meta: mod.meta || { title: path.split('/').pop() || 'Post' }
})).sort((a,b) => (b.meta.date||'').localeCompare(a.meta.date||''))

export function BlogSection() {
  const [active, setActive] = useState<number | null>(entries.length ? 0 : null)

  if (entries.length === 0) return <div className="opacity-70">Постов пока нет.</div>

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      <aside className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3">
        <div className="text-sm opacity-70 mb-2">Посты</div>
        <div className="grid">
          {entries.map((e, i) => (
            <button key={e.path} onClick={() => setActive(i)} className={"text-left px-3 py-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 " + (active===i ? "bg-neutral-100 dark:bg-neutral-900" : "")}>
              <div className="font-semibold">{e.meta.title}</div>
              {e.meta.date && <div className="text-xs opacity-70">{e.meta.date}</div>}
            </button>
          ))}
        </div>
      </aside>
      <main className="prose prose-neutral dark:prose-invert max-w-none">
        {active!==null && (() => {
          const E = entries[active].Component
          return <E />
        })()}
      </main>
    </div>
  )
}
