"use client";
import { useEffect, useState } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import profileData from '@/data/profile_info.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';

const formatDate = (dateString) => {
  if (!dateString) return 'Present';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return dateString;
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useScrollReveal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero container">
        <div className="animate-on-scroll">
          <h1>Hi, I'm {profileData.profile.name}</h1>
          <h2 className="tagline">{profileData.profile.tagline}</h2>
        </div>
        <p className="bio-snippet animate-on-scroll" style={{ transitionDelay: '100ms' }}>
          {profileData.profile.bio}
        </p>
        <div className="hero-actions animate-on-scroll" style={{ transitionDelay: '200ms' }}>
          <a href="/contact" className="btn btn-primary">Get in Touch</a>
          <a href={profileData.profile.resume} target="_blank" className="btn btn-outline" rel="noreferrer">
            <i className="ri-file-download-line"></i> Download Resume
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container">
        <h2 className="section-title animate-on-scroll">About Me</h2>
        <div className="about-intro card animate-on-scroll">
          <div className="about-main">
            {profileData.profile.about.split('<break>').map((paragraph, i) => (
              <div key={i}>
                {i > 0 && <p style={{ marginTop: '1rem' }}></p>}
                <p>{paragraph}</p>
              </div>
            ))}
          </div>
          <div className="about-footer">
            {profileData.profile.about_pills.map((pill, index) => (
              <span key={index} className="tagline-pill">{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey building robust backend systems.</p>
        </div>

        <div className="experience-list">
          {[...experienceData.experience].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map((exp, index) => (
            <article key={index} className="experience-card card animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="exp-visual-accent"></div>
              <div className="exp-content">
                <header className="exp-header">
                  <div className="exp-info">
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company-row">
                      <span className="exp-at">at</span>
                      <a href={exp.company_website} target="_blank" rel="noreferrer" className="exp-company">
                        {exp.company_name}
                      </a>
                    </div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-date">
                      {mounted ? formatDate(exp.start_date) : '...'} — {mounted ? formatDate(exp.end_date) : '...'}
                    </span>
                    <span className="exp-location"><i className="ri-map-pin-line"></i> {exp.location}</span>
                  </div>
                </header>
                <p className="exp-description">{exp.description}</p>
                <div className="exp-tags">
                  {exp.tech_stack_names.map((tech, tIndex) => (
                    <span key={tIndex} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container">
        <h2 className="section-title animate-on-scroll">Skills</h2>
        <p className="section-subtitle animate-on-scroll">Technologies and tools I work with daily.</p>

        <div className="skills-container">
          {/* Categorized Skills */}
          {["BE", "FE", "DO", "AI"].map((catId) => {
            const catNames = { BE: "Backend & APIs", FE: "Frontend", DO: "DevOps & Cloud", AI: "AI & ML" };
            const catSkills = skillsData.skills.filter(s => s.category === catId);

            return (
              <div key={catId} className="skills-category animate-on-scroll">
                <h3 className="skills-category-title">{catNames[catId]}</h3>
                <div className="skills-grid">
                  {catSkills.map((skill, sIndex) => (
                    <div key={sIndex} className="skill-item">
                      <img
                        src={skill.icon_url}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className={`skill-icon ${skill.invert ? 'invert-on-dark' : ''}`}
                        loading="lazy"
                      />
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
