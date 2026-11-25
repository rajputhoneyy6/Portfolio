const nodemailer = require('nodemailer');

function getGmailConfig() {
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const to = (process.env.NOTIFY_EMAIL || user).trim();
  return { user, pass, to };
}

function createTransporter() {
  const { user, pass } = getGmailConfig();
  if (!user || !pass || pass === 'your-16-char-gmail-app-password') {
    return null;
  }
  const host = (process.env.SMTP_HOST || '').trim();
  if (!host || host === 'smtp.gmail.com') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass }
  });
}

function logMailerStatus() {
  const { user, pass, to } = getGmailConfig();
  if (!user || !pass || pass === 'your-16-char-gmail-app-password') {
    console.log('[Mailer] Gmail notifications OFF — set SMTP_USER and a 16-char Gmail App Password in server/.env to enable.');
  } else {
    console.log(`[Mailer] Gmail notifications ENABLED -> sending to ${to}`);
  }
}

async function sendNotification({ subject, text, html, replyTo }) {
  const { user, to } = getGmailConfig();
  const transporter = createTransporter();
  if (!transporter || !to) {
    console.log('[Mailer] Saved locally (Gmail not configured):\n', subject, '\n', text);
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
