import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from './data/defaults';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ProcessSection from './components/ProcessSection';
import ServicesSection from './components/ServicesSection';
import ClientsSection from './components/ClientsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BottomDock from './components/BottomDock';
import { BookingModal, CustomizeModal, ProjectModal, Toast } from './components/Modals';

export default function App() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ayush_fullstack_react_profile_v2');
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch (_e) {
      return DEFAULT_PROFILE;
    }
  });
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [view, setView] = useState('home');
  const [activeDock, setActiveDock] = useState('home');
  const [filter, setFilter] = useState('All');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [toast, setToast] = useState('');

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(''), 2600);
  }

  // Hydrate profile & projects from Express backend
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.profile) setProfile((prev) => ({ ...prev, ...data.profile }));
        if (Array.isArray(data?.projects) && data.projects.length) setProjects(data.projects);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.title = `${profile.firstName} – Portfolio`;
  }, [profile.firstName]);

  // Scroll-reveal observer whenever view changes
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [view, filter]);

  function scrollToSection(id) {
    setView('home');
    setActiveDock(id === 'hero' ? 'home' : id);
    setTimeout(() => {
      if (id === 'hero') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  }

  function handleDockNavigate(target) {
    if (target === 'home') scrollToSection('hero');
    else if (target === 'projects') scrollToSection('projects');
    else if (target === 'services') scrollToSection('services');
    else if (target === 'contact') {
      setActiveDock('contact');
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleCopyEmail() {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(profile.email).then(() => showToast(`Email copied: ${profile.email}`)).catch(() => showToast(profile.email));
    } else {
      showToast(profile.email);
    }
  }

  async function handleSaveProfile(next) {
    setProfile(next);
    try {
      localStorage.setItem('ayush_fullstack_react_profile_v2', JSON.stringify(next));
    } catch (_e) {}
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      });
    } catch (_e) {}
    setCustomizeOpen(false);
    showToast('Portfolio updated!');
  }

  function handleResetProfile() {
    setProfile(DEFAULT_PROFILE);
    try { localStorage.removeItem('ayush_fullstack_react_profile_v2'); } catch (_e) {}
    setCustomizeOpen(false);
    showToast('Defaults restored');
  }

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;
  const filteredProjects = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <TopBar
        profile={profile}
        onGoHome={() => scrollToSection('hero')}
        onOpenCustomize={() => setCustomizeOpen(true)}
      />

      {view === 'home' ? (
        <main>
          <Hero
            profile={profile}
            onScrollContact={() => handleDockNavigate('contact')}
            onOpenProject={(id) => setSelectedProjectId(id)}
            onOpenCustomize={() => setCustomizeOpen(true)}
            onToast={showToast}
          />
          <ProjectsSection
            projects={projects}
            onOpenProject={(id) => setSelectedProjectId(id)}
            onSeeAll={() => {
              setView('projects');
              setActiveDock('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
          <SkillsSection profile={profile} onScrollContact={() => handleDockNavigate('contact')} />
          <ProcessSection />
          <ServicesSection onScrollContact={() => handleDockNavigate('contact')} />
          <ClientsSection />
          <FaqSection onScrollContact={() => handleDockNavigate('contact')} />
        </main>
      ) : (
        <section className="archive-section">
          <div className="col-narrow">
            <p className="section-kicker"><span className="kicker-dot" /><span>My Projects</span></p>
            <h1 className="section-heading font-serif" style={{ fontSize: 38, maxWidth: 440 }}>
              Full-stack builds that turn ideas into a bold reality
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
              <button type="button" className="btn-glossy" onClick={() => handleDockNavigate('contact')}>
                <span>Get In Touch Today</span>
                <ArrowUpRight size={14} />
              </button>
              <button
                type="button"
                className="btn-pill-soft"
                style={{ marginTop: 0 }}
                onClick={() => scrollToSection('hero')}
              >
                <ArrowLeft size={14} />
                <span>Back to Home</span>
              </button>
            </div>

            <div className="filter-row">
              {['All', 'Full Stack Web', 'E-Commerce', 'Backend & Java'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="projects-stack">
              {filteredProjects.map((p) => (
                <article key={p.id} className="proj-card" onClick={() => setSelectedProjectId(p.id)}>
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
          </div>
        </section>
      )}

      <ContactSection
        profile={profile}
        onCopyEmail={handleCopyEmail}
        onOpenBooking={() => setBookingOpen(true)}
        onToast={showToast}
      />

      <Footer profile={profile} onCopyEmail={handleCopyEmail} onToast={showToast} />
      <BottomDock activeDock={activeDock} onNavigate={handleDockNavigate} />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onInquire={() => {
          setSelectedProjectId(null);
          handleDockNavigate('contact');
        }}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} onToast={showToast} />
      <CustomizeModal
        open={customizeOpen}
        profile={profile}
        onClose={() => setCustomizeOpen(false)}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />
      <Toast message={toast} />
    </>
  );
}
