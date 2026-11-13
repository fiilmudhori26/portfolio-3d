'use client'

import { useState } from 'react'
import { personalInfo } from '@/lib/data'

// Set WEB3FORMS_ACCESS_KEY below to your free key from https://web3forms.com
// (enter your email -> you get an access key by mail; no backend needed).
// If left empty, the form falls back to opening the mail client instead.
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || ''

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Portfolio — pesan dari ${name}`,
            from_name: name,
            name,
            email,
            message,
            botcheck: '',
          }),
        })
        const data = await res.json()
        if (data.success) {
          setStatus('ok')
          setName(''); setEmail(''); setMessage('')
        } else {
          setStatus('error')
          setError(data.message || 'Gagal mengirim pesan.')
        }
      } catch {
        setStatus('error')
        setError('Gagal mengirim pesan. Coba lagi atau pakai email langsung.')
      }
    } else {
      // No access key configured — open mail client with prefilled content.
      const subject = encodeURIComponent(`Portfolio — pesan dari ${name}`)
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
      setStatus('ok')
    }
  }

  return (
    <form onSubmit={submit} className="border border-line rounded-2xl bg-card p-5 sm:p-6 mt-10">
      <p className="label-mono !text-[10px]">Tulis Pesan</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="cf-name" className="label-mono !text-[9px] block mb-1.5">Nama</label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent"
            placeholder="Nama kamu"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="label-mono !text-[9px] block mb-1.5">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent"
            placeholder="kamu@email.com"
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="cf-message" className="label-mono !text-[9px] block mb-1.5">Pesan</label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-paper border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-accent resize-y"
          placeholder="Ceritakan singkat project / kesempatan yang kamu bawa…"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-ink disabled:opacity-60"
        >
          {status === 'sending' ? 'Mengirim…' : 'Kirim Pesan'}
        </button>
        {status === 'ok' && (
          <p className="label-mono !text-[10px] text-accent">Terima kasih — pesan diterima.</p>
        )}
        {status === 'error' && (
          <p className="label-mono !text-[10px] text-accent">{error}</p>
        )}
        {!WEB3FORMS_ACCESS_KEY && status !== 'ok' && (
          <p className="label-mono !text-[8px] text-muted">atau klik email di atas — terbuka di mail client kamu</p>
        )}
      </div>
    </form>
  )
}
