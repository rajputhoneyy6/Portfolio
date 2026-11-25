import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Hero({ profile, onScrollContact, onOpenProject, onOpenCustomize, onToast }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: ny * -14, y: nx * 16 });
  }

  return (
    <section
      id="hero"
      className="hero-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="hero-torus-stage"
        aria-hidden="true"
        style={{
          transform: `translateY(-50%) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`
        }}
      >
        <img src="/assets/torus-hero.jpg" alt="" className="hero-torus" />
      </div>
      <div className="hero-bottom-fade" aria-hidden="true" />

      <div className="col-narrow hero-content">
        <h1 className="hero-title font-serif">
          <span className="hero-line hero-d1">
            <span className="text-muted-hero">Hey, I&apos;m</span>
            <button type="button" className="hero-badge hero-badge-avatar" onClick={onOpenCustomize} title="Customize profile">
              {profile.initials}
            </button>
            <span>{profile.firstName}</span>
          </span>

          <span className="hero-line hero-d2">
            <span>{profile.roleTitle}</span>
            <button type="button" className="hero-badge" onClick={() => onOpenProject('proj-1')} title="Preview Project 01">
              <img src="/assets/project-1.jpg" alt="Project preview 1" />
            </button>
            <button type="button" className="hero-badge hero-badge-overlap" onClick={() => onOpenProject('proj-2')} title="Preview Project 02">
              <img src="/assets/project-2.jpg" alt="Project preview 2" />
            </button>
          </span>

          <span className="hero-line hero-d3">
            <span className="text-muted-hero">Living in</span>
            <button
              type="button"
              className="hero-badge"
              onClick={() => onToast(`Based in ${profile.location} — available worldwide`)}
              title={`Location: ${profile.location}`}
            >
              <svg viewBox="0 0 44 44" width="42" height="42" aria-hidden="true">
                <defs>
                  <radialGradient id="earthGrad" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#fdba74" />
                    <stop offset="55%" stopColor="#c2410c" />
                    <stop offset="100%" stopColor="#431407" />
                  </radialGradient>
                </defs>
                <circle cx="22" cy="22" r="22" fill="url(#earthGrad)" />
                <path d="M12 18 Q20 12 28 19 T34 28" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
                <circle cx="23" cy="21" r="3.2" fill="#ffffff" />
                <circle cx="23" cy="21" r="6.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
              </svg>
            </button>
            <span>{profile.location}</span>
          </span>
        </h1>

        <p className="hero-subtitle hero-line hero-d4">{profile.heroSubtitle}</p>

        <div className="hero-cta-wrap hero-line hero-d5">
          <button type="button" className="btn-glossy" onClick={onScrollContact}>
            <span>Get In Touch Today</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
