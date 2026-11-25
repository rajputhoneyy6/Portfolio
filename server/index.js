require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const { readDB, writeDB } = require('./store');
const { sendNotification, logMailerStatus } = require('./mailer');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) return next();
  const token = req.headers['x-admin-token'] || req.query.token;
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: invalid admin token' });
  }
  next();
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/portfolio', (_req, res) => {
  const db = readDB();
  res.json({ profile: db.profile, projects: db.projects });
});

app.put('/api/profile', (req, res) => {
  const db = readDB();
  const allowed = ['firstName', 'brandName', 'initials', 'roleTitle', 'location', 'email', 'heroSubtitle', 'footerWordmark'];
  for (const key of allowed) {
    if (typeof req.body[key] === 'string' && req.body[key].trim()) {
      db.profile[key] = req.body[key].trim();
    }
  }
  writeDB(db);
  res.json({ ok: true, profile: db.profile });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, website, budget, message } = req.body || {};
  if (!name || !email || !budget || !message) {
    return res.status(400).json({ error: 'Full name, email, budget, and message are required.' });
  }
  const db = readDB();
  const entry = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    website: website ? String(website).trim() : '',
    budget: String(budget).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };
  db.messages.unshift(entry);
  writeDB(db);

  let emailSent = false;
  try {
    const mailRes = await sendNotification({
      subject: `New Portfolio Inquiry from ${entry.name} (${entry.budget})`,
      replyTo: entry.email,
      text: `Name: ${entry.name}\nEmail: ${entry.email}\nWebsite: ${entry.website || 'N/A'}\nBudget: ${entry.budget}\n\nMessage:\n${entry.message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;line-height:1.6;color:#18181b;">
          <h2 style="margin:0 0 12px;">New Portfolio Contact Inquiry</h2>
          <p><strong>Name:</strong> ${esc(entry.name)}</p>
          <p><strong>Email:</strong> ${esc(entry.email)}</p>
          <p><strong>Website:</strong> ${esc(entry.website || 'Not provided')}</p>
          <p><strong>Budget:</strong> ${esc(entry.budget)}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#f4f4f5;padding:12px 14px;border-radius:10px;white-space:pre-wrap;">${esc(entry.message)}</div>
          <p style="font-size:12px;color:#71717a;margin-top:16px;">Hit Reply in Gmail to respond directly to ${esc(entry.email)}.</p>
        </div>
      `
    });
    emailSent = Boolean(mailRes.sent);
  } catch (err) {
    console.error('[Mailer error]', err.message);
  }

  res.status(201).json({ ok: true, emailSent, inquiry: entry });
});

app.post('/api/bookings', async (req, res) => {
  const { day, slot, email } = req.body || {};
  if (!day || !slot || !email) {
    return res.status(400).json({ error: 'Day, time slot, and email are required.' });
  }
  const db = readDB();
  const booking = {
    id: crypto.randomUUID(),
    day: String(day).trim(),
    slot: String(slot).trim(),
    email: String(email).trim(),
    createdAt: new Date().toISOString()
  };
  db.bookings.unshift(booking);
  writeDB(db);

  let emailSent = false;
  try {
    const mailRes = await sendNotification({
      subject: `New Discovery Call Request: ${booking.day} at ${booking.slot}`,
      replyTo: booking.email,
      text: `Caller Email: ${booking.email}\nPreferred Day: ${booking.day}\nTime Slot: ${booking.slot}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;line-height:1.6;color:#18181b;">
          <h2 style="margin:0 0 12px;">New Discovery Call Request</h2>
          <p><strong>Caller Email:</strong> ${esc(booking.email)}</p>
          <p><strong>Preferred Day:</strong> ${esc(booking.day)}</p>
          <p><strong>Time Slot:</strong> ${esc(booking.slot)}</p>
          <p style="font-size:12px;color:#71717a;margin-top:16px;">Hit Reply in Gmail to send a Google Meet link directly to ${esc(booking.email)}.</p>
        </div>
      `
    });
    emailSent = Boolean(mailRes.sent);
  } catch (err) {
    console.error('[Mailer error]', err.message);
  }

  res.status(201).json({ ok: true, emailSent, booking });
});

app.get('/api/admin/submissions', requireAdmin, (_req, res) => {
  const db = readDB();
  res.json({ messages: db.messages, bookings: db.bookings });
});

// Serve Vite production build if present
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Express API running at http://localhost:${PORT}`);
  logMailerStatus();
});
