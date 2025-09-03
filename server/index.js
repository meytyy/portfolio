
import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8788

app.post('/api/contact', async (req, res) => {
  const { name, email, message, toTelegram, toEmail } = req.body || {}

  try {
    // Telegram
    if (toTelegram) {
      const token = process.env.TELEGRAM_BOT_TOKEN
      const chatId = process.env.TELEGRAM_CHAT_ID
      if (!token || !chatId) {
        console.log('Telegram ENV not set, skipping')
      } else {
        const txt = `📨 New contact form\n👤 ${name}\n✉️ ${email}\n\n${message}`
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: txt })
        })
      }
    }

    // Email
    if (toEmail) {
      const user = process.env.EMAIL_USER
      const pass = process.env.EMAIL_PASS
      const to = process.env.EMAIL_TO || user
      if (!user || !pass || !to) {
        console.log('Email ENV not set, skipping')
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        })
        await transporter.sendMail({
          from: `"Portfolio" <${user}>`,
          to,
          subject: `Portfolio contact from ${name}`,
          text: `${message}\n\nFrom: ${name} <${email}>`,
        })
      }
    }

    res.json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ ok: false, error: String(e) })
  }
})

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
