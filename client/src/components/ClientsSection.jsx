import React from 'react';
import { HIGHLIGHTS } from '../data/defaults';

export default function ClientsSection() {
  return (
    <section id="highlights" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>Engineering Focus</span></p>
          <h2 className="section-heading font-serif">Built for clean code, speed, and real-world use</h2>
        </div>

        <div className="services-grid reveal">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="process-card" style={{ padding: 20 }}>
              <p className="process-step-label">{item.kicker}</p>
              <h3 className="process-title" style={{ fontSize: 15 }}>{item.title}</h3>
              <p className="process-desc" style={{ fontSize: 12 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
