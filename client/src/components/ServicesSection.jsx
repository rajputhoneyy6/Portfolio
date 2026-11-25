import React from 'react';
import { SERVICES_CARDS, SERVICE_CHIPS } from '../data/defaults';

export default function ServicesSection({ onScrollContact }) {
  return (
    <section id="services" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>Services</span></p>
          <h2 className="section-heading font-serif">End-to-end engineering built for scale</h2>
        </div>

        <div className="services-grid reveal">
          {SERVICES_CARDS.map((card) => (
            <div key={card.title} className="service-card" onClick={onScrollContact}>
              <div className={`service-fan ${card.grayscale ? 'fan-grayscale' : ''}`}>
                <div className="fan-back"><img src={card.image} alt="" /></div>
                <div className="fan-front"><img src={card.image} alt={`${card.title} preview`} /></div>
              </div>
              <h3 className="service-title">{card.title}</h3>
            </div>
          ))}
        </div>

        <div className="service-chips reveal">
          {SERVICE_CHIPS.map((chip) => (
            <span key={chip} className="service-chip">{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
