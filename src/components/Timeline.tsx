
type Item = { title: string; place: string; period: string; points: string[] }

export function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-6">
      {items.map((it, idx) => (
        <div key={idx} className="grid sm:grid-cols-[12ch_1fr] gap-4">
          <div className="text-sm opacity-70">{it.period}</div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm opacity-70">{it.place}</div>
            <ul className="mt-2 text-sm grid gap-1 list-disc pl-5">
              {it.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
