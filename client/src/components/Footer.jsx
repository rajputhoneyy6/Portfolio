import React from 'react';
import { Dribbble, Instagram, Twitter } from 'lucide-react';

export default function Footer({ profile, onCopyEmail, onToast }) {
  return (
    <footer className="site-footer">
      <div className="col-narrow">
        <div className="footer-wordmark font-serif">{profile.footerWordmark}</div>
        <p className="footer-tagline">
          From responsive React interfaces to scalable Node.js & MongoDB backends, I build reliable web experiences end to end.
        </p>

        <div className="footer-bar">
          <button type="button" onClick={onCopyEmail}>{profile.email}</button>
          <div className="footer-socials">
            <button type="button" aria-label="Dribbble" onClick={() => onToast('Link your Dribbble profile in Footer.jsx')}><Dribbble size={15} /></button>
            <button type="button" aria-label="Instagram" onClick={() => onToast('Link your Instagram profile in Footer.jsx')}><Instagram size={15} /></button>
            <button type="button" aria-label="X" onClick={() => onToast('Link your X profile in Footer.jsx')}><Twitter size={15} /></button>
          </div>
        </div>

        <div className="footer-copy">
          <span>© 2026 {profile.firstName}</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
