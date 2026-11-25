import React from 'react';

const STEPS = [
  {
    step: 'step1',
    num: '- 001',
    title: "Let's Get In Touch",
    desc: 'Start by reaching out through our contact page. Fill out the form or book a call to discuss your project, goals, and ideas in even greater detail.',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" className="sketch-bob" fill="none" stroke="#3f3f46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="10" width="32" height="28" rx="4" fill="#ffffff" />
        <path d="M8 18h32M16 6v6M32 6v6" />
        <text x="24" y="33" textAnchor="middle" fontSize="12" fontWeight="700" fill="#18181b" stroke="none">31</text>
      </svg>
    )
  },
  {
    step: 'step2',
    num: '- 002',
    title: 'Architecture & APIs',
    desc: 'I plan the database schema, RESTful API endpoints, and responsive React + Vite frontend & API architecture tailored to your exact product goals.',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" className="sketch-wave" fill="none" stroke="#52525b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 24V12a2 2 0 1 1 4 0v10M22 20V9a2 2 0 1 1 4 0v11M26 20v-8a2 2 0 1 1 4 0v11M30 22v-5a2 2 0 1 1 4 0v10c0 7-4.5 12-11 12-5.5 0-9-3.5-10.5-8.5l-2.5-6a2 2 0 1 1 3.7-1.5L18 27" fill="#e4e4e7" />
      </svg>
    )
  },
  {
    step: 'step3',
    num: '- 003',
    title: 'Full Stack Build & APIs',
    desc: 'I build the frontend in React and JavaScript (ES6+), wire Node.js & Express APIs with MongoDB, and verify every endpoint with Postman.',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" className="sketch-bob" fill="none" stroke="#3f3f46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="36" height="26" rx="4" fill="#ffffff" />
        <path d="M6 17h36" />
        <circle cx="11" cy="13.5" r="1" fill="#18181b" />
        <circle cx="15" cy="13.5" r="1" fill="#18181b" />
        <path d="M18 24l-4 3 4 3M30 24l4 3-4 3M25 22l-2 10" />
      </svg>
    )
  },
  {
    step: 'step4',
    num: '- 004',
    title: 'Testing & Deployment',
    desc: 'Receive a clean, tested, production-ready application with full source code, environment setup, and deployment support.',
    icon: (
      <svg viewBox="0 0 48 48" width="40" height="40" className="sketch-bob" fill="none" stroke="#52525b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22l7-7 7 4 7-4 11 9-7 7-4-2-4 4-6-2-4 2z" fill="#e4e4e7" />
        <path d="M15 26l6 6M22 25l5 5M27 22l4 4" />
      </svg>
    )
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>Process</span></p>
          <h2 className="section-heading font-serif">The strategy behind exceptional results</h2>
        </div>

        <div className="process-rail">
          {STEPS.map((s) => (
            <div key={s.step} className="process-card reveal">
              <span className="process-dot" />
              <p className="process-step-label">{s.step}</p>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
              <div className="process-bottom">
                {s.icon}
                <span className="process-num">{s.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
