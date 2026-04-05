
import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.ok) setStatus('ok')
      else setStatus(data.error || 'error')
    } catch (e:any) {
      setStatus(e.message || 'error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="name" required placeholder="Ваше имя / Your name" className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-white dark:bg-neutral-900"/>
      <input name="email" required type="email" placeholder="Email" className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-white dark:bg-neutral-900"/>
      <textarea name="message" required placeholder="Сообщение / Message" className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2 h-32 bg-white dark:bg-neutral-900"></textarea>
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 text-sm opacity-80">
          <input type="checkbox" name="toTelegram" defaultChecked/> Telegram
        </label>
        <label className="inline-flex items-center gap-2 text-sm opacity-80">
          <input type="checkbox" name="toEmail" defaultChecked/> Email
        </label>
      </div>
      <button className="rounded-full px-5 py-2 bg-black text-white dark:bg-white dark:text-black disabled:opacity-50" disabled={status==='sending'}>
        {status==='sending' ? 'Отправка…' : 'Отправить'}
      </button>
      {status && status!=='sending' && (
        <div className="text-sm opacity-80">
          {status==='ok' ? 'Готово! Я свяжусь с вами.' : 'Ошибка: ' + status}
        </div>
      )}
    </form>
  )
}
