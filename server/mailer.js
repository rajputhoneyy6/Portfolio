const nodemailer = require('nodemailer');

function getConfig() {
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const to = (process.env.NOTIFY_EMAIL || user || 'rajput.honeyy6@gmail.com').trim();
  return { resendKey, user, pass, to };
}

function createTransporter() {
  const { user, pass } = getConfig();
  if (!user || !pass || pass === 'your-16-char-gmail-app-password') {
    return null;
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

function logMailerStatus() {
  const { resendKey, user, pass, to } = getConfig();
  if (resendKey) {
    console.log(`[Mailer] Resend API ENABLED -> sending to ${to}`);
  } else if (user && pass && pass !== 'your-16-char-gmail-app-password') {
    console.log(`[Mailer] Gmail SMTP ENABLED -> sending to ${to}`);
  } else {
    console.log('[Mailer] Notifications OFF — set RESEND_API_KEY or SMTP credentials.');
  }
}

async function sendNotification({ subject, text, html, replyTo }) {
  const { resendKey, user, to } = getConfig();

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Ayush Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: replyTo || undefined,
        subject,
        text,
        html
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Resend API error (${res.status}): ${errText}`);
    }
    return { sent: true, mode: 'resend' };
  }

  const transporter = createTransporter();
  if (!transporter || !to) {
    console.log('[Mailer] Saved locally (mailer not configured):\n', subject, '\n', text);
    return { sent: false, mode: 'console' };
  }

  await transporter.sendMail({
    from: `"Ayush Portfolio" <${user}>`,
    to,
    replyTo: replyTo || undefined,
    subject,
    text,
    html
  });
  return { sent: true, mode: 'gmail' };
}

module.exports = { sendNotification, logMailerStatus };
