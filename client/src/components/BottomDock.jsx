import React from 'react';

const ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' }
];

export default function BottomDock({ activeDock, onNavigate }) {
  return (
    <nav aria-label="Primary navigation" className="bottom-dock-wrap">
      <div className="bottom-dock">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dock-btn ${activeDock === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
