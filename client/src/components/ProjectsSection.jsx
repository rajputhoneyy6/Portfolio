import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection({ projects, onOpenProject, onSeeAll }) {
  return (
    <section id="projects" className="section-block">
      <div className="col-narrow">
        <div className="section-header reveal">
          <p className="section-kicker"><span className="kicker-dot" /><span>My Projects</span></p>
          <h2 className="section-heading font-serif">Full-stack builds that turn ideas into reality</h2>
        </div>

        <div className="projects-stack">
          {projects.map((p) => (
            <article key={p.id} className="proj-card reveal" onClick={() => onOpenProject(p.id)}>
              <div className="proj-img-wrap">
                <img src={p.image} alt={p.title} className="proj-img" />
              </div>
              <div className="proj-footer">
                <h3 className="proj-title">{p.title}</h3>
                <ArrowUpRight size={15} className="proj-arrow" />
              </div>
            </article>
          ))}
        </div>

        <div className="reveal">
          <button type="button" className="btn-pill-soft" onClick={onSeeAll}>
            <span>See All</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
