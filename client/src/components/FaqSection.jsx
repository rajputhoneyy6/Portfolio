import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/defaults';

export default function FaqSection({ onScrollContact }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>FAQ&apos;S</span></p>
          <h2 className="section-heading font-serif">Your concerns, addressed with clarity</h2>
        </div>

        <div className="faq-list reveal">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className={`faq-row ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-toggle"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                >
                  <span>{item.q}</span>
                  <span className="faq-chev"><ChevronDown size={14} /></span>
                </button>
                <div className="faq-body">
                  <div className="faq-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="script-cta-box reveal">
          <p className="script-prompt font-script">Still have questions? Feel free to get in touch today!</p>
          <button type="button" className="btn-glossy" onClick={onScrollContact}>
            <span>Get In Touch Today</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
