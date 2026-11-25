import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

export default function TopBar({ profile, onGoHome, onOpenCustomize }) {
  return (
    <header className="top-bar">
      <button type="button" className="top-brand font-script" onClick={onGoHome}>
        {profile.brandName}
      </button>
      <div className="top-right">
        <div className="avail-badge">
          <span className="dot-wrap">
            <span className="dot-ring" />
            <span className="dot-core" />
          </span>
          <span>available for work</span>
        </div>
        <button
          type="button"
          className="customize-icon-btn"
          title="Customize portfolio details"
          onClick={onOpenCustomize}
        >
          <SlidersHorizontal size={14} />
        </button>
      </div>
    </header>
  );
}
