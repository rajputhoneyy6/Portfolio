import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export function ProjectModal({ project, onClose, onInquire }) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-img-wrap">
          <img src={project.image} alt={project.title} />
          <button type="button" className="modal-close-abs" aria-label="Close modal" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-pad">
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <span className="service-chip" style={{ padding: '4px 10px', fontSize: 11 }}>{project.category}</span>
            <span className="service-chip" style={{ padding: '4px 10px', fontSize: 11, background: '#ecfdf5', color: '#047857' }}>{project.year}</span>
          </div>
          <h3 className="font-serif" style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 400 }}>{project.title}</h3>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: '#71717a' }}>{project.description}</p>
          <div className="meta-grid-3">
            <div><p className="meta-k">Role</p><p className="meta-v">{project.role}</p></div>
            <div><p className="meta-k">Scope</p><p className="meta-v">{project.scope}</p></div>
            <div><p className="meta-k">Tools</p><p className="meta-v">{project.stack}</p></div>
          </div>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="btn-glossy" onClick={onInquire}>Start a similar project</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookingModal({ open, onClose, onToast }) {
  const [day, setDay] = useState('Tomorrow');
  const [slot, setSlot] = useState('11:00 AM IST');
  const [email, setEmail] = useState('');

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, slot, email })
      });
    } catch (_err) {}
    setEmail('');
    onClose();
    onToast(`Call booked for ${day} at ${slot}`);
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box modal-sm">
        <div className="modal-head-row">
          <h3 className="font-serif" style={{ margin: 0, fontSize: 24, fontWeight: 400 }}>Book a Discovery Call</h3>
          <button type="button" className="modal-close-inline" aria-label="Close" onClick={onClose}><X size={16} /></button>
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 12, color: '#71717a' }}>Choose a preferred day and IST slot for a 20-minute intro chat.</p>
        <form className="form-stack" onSubmit={handleSubmit}>
          <div>
            <label className="field-label">Preferred Day</label>
            <div className="choice-grid-3">
              {['Tomorrow', 'Thu', 'Fri'].map((d) => (
                <button key={d} type="button" className={`choice-btn ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="field-label">Time Slot (IST)</label>
            <div className="choice-grid-2">
              {['11:00 AM IST', '2:30 PM IST', '5:00 PM IST', '7:30 PM IST'].map((s) => (
                <button key={s} type="button" className={`choice-btn ${slot === s ? 'active' : ''}`} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="bk-email" className="field-label">Your Email</label>
            <input id="bk-email" type="email" required placeholder="you@company.com" className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn-glossy btn-full" style={{ borderRadius: '9999px' }}>Confirm Call Slot</button>
        </form>
      </div>
    </div>
  );
}

export function CustomizeModal({ open, profile, onClose, onSave, onReset }) {
  const [draft, setDraft] = useState(profile);

  React.useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const firstName = draft.firstName.trim() || 'Ayush';
    onSave({
      ...draft,
      firstName,
      brandName: draft.brandName.trim() || `${firstName} Design`,
      initials: firstName.slice(0, 2).toUpperCase(),
      footerWordmark: firstName.toUpperCase()
    });
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box modal-sm">
        <div className="modal-head-row">
          <div>
            <h3 className="font-serif" style={{ margin: 0, fontSize: 24, fontWeight: 400 }}>Customize Portfolio</h3>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#71717a' }}>Saved directly to your Express backend.</p>
          </div>
          <button type="button" className="modal-close-inline" aria-label="Close" onClick={onClose}><X size={16} /></button>
        </div>
        <form className="form-stack" onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div>
              <label className="field-label">First Name</label>
              <input className="field-input" value={draft.firstName} onChange={(e) => setDraft({ ...draft, firstName: e.target.value })} />
            </div>
            <div>
              <label className="field-label">Logo Signature</label>
              <input className="field-input" value={draft.brandName} onChange={(e) => setDraft({ ...draft, brandName: e.target.value })} />
            </div>
          </div>
          <div className="form-row-2">
            <div>
              <label className="field-label">Role Headline</label>
              <input className="field-input" value={draft.roleTitle} onChange={(e) => setDraft({ ...draft, roleTitle: e.target.value })} />
            </div>
            <div>
              <label className="field-label">Location</label>
              <input className="field-input" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="field-label">Contact Email</label>
            <input type="email" className="field-input" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          </div>
          <div>
            <label className="field-label">Hero Bio Subtitle</label>
            <textarea rows={2} className="field-input field-textarea" value={draft.heroSubtitle} onChange={(e) => setDraft({ ...draft, heroSubtitle: e.target.value })} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <button type="button" style={{ fontSize: 12, color: '#71717a', textDecoration: 'underline' }} onClick={onReset}>Reset defaults</button>
            <button type="submit" className="btn-glossy">Apply Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast">
      <CheckCircle2 size={14} color="#34d399" />
      <span>{message}</span>
    </div>
  );
}
