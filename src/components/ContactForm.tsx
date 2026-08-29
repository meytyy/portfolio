
import { useState } from 'react'
import { Send } from 'lucide-react'
import { useI18n } from '../i18n'

const CONTACT_EMAIL = 'ssddsss1337@gmail.com'

export function ContactForm() {
  const { t } = useI18n()
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="hidden" name="_subject" value="New message from portfolio" />
      <input type="hidden" name="_template" value="table" />
      <input name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <label className="grid gap-1.5 text-sm">
        <span className="opacity-70">{t('contact_form_name')}</span>
        <input name="name" required autoComplete="name" placeholder={t('contact_form_name_placeholder')} className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2.5 bg-white dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600" />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="opacity-70">Email</span>
        <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2.5 bg-white dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600" />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="opacity-70">{t('contact_form_message')}</span>
        <textarea name="message" required minLength={10} placeholder={t('contact_form_message_placeholder')} className="rounded-xl border border-neutral-300 dark:border-neutral-700 px-3 py-2.5 h-32 resize-y bg-white dark:bg-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600" />
      </label>
      <button className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 bg-black text-white dark:bg-white dark:text-black disabled:opacity-50 transition hover:translate-y-[-1px]" disabled={status === 'sending'}>
        <Send size={16} /> {status === 'sending' ? t('contact_form_sending') : t('contact_form_submit')}
      </button>
      {status === 'ok' && (
        <div className="text-sm text-emerald-700 dark:text-emerald-400" role="status">{t('contact_form_success')}</div>
      )}
      {status === 'error' && (
        <div className="text-sm text-red-700 dark:text-red-400" role="alert">
          {t('contact_form_error')}{' '}
          <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </div>
      )}
    </form>
  )
}
