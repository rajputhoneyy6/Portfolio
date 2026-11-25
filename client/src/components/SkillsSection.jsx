import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SKILLS, EXPERIENCE } from '../data/defaults';

export default function SkillsSection({ profile, onScrollContact }) {
  const [activeSkill, setActiveSkill] = useState(0);

  return (
    <section id="skills" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>Skills &amp; Expertise</span></p>
          <h2 className="section-heading font-serif">The tech stack that powers my builds</h2>
        </div>

        <div className="reveal">
          <div className="skills-banner">
            <img src="/assets/workspace-banner.jpg" alt="Development workspace" />
          </div>
          <div className="skills-overlap-row">
            <div className="skills-avatar">
              <span className="skills-avatar-init">{profile.initials}</span>
              <span className="skills-avatar-sub">Full Stack</span>
            </div>
            <div className="skills-pills">
              {SKILLS.map((s, idx) => (
                <button
                  key={s.name}
                  type="button"
                  className={`skill-btn ${idx === activeSkill ? 'active' : ''}`}
                  onClick={() => setActiveSkill(idx)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <p className="skill-readout">
            {SKILLS[activeSkill].name}: {SKILLS[activeSkill].detail}
          </p>
        </div>

        <div className="exp-list reveal">
          {EXPERIENCE.map((item) => (
            <div key={item.role} className="exp-row">
              <span className="exp-role">{item.role}</span>
              <span className="exp-company">{item.company}</span>
              <span className="exp-period">{item.period}</span>
            </div>
          ))}
        </div>

        <div className="script-cta-box reveal">
          <p className="script-prompt font-script">Tell Me About Your Next Web Project</p>
          <button type="button" className="btn-glossy" onClick={onScrollContact}>
            <span>Get In Touch Today</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
