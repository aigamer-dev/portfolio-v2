"use client";
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ProjectsClient({ projects }) {
    useScrollReveal();

    return (
        <section id="projects" className="container" style={{ marginTop: '8rem' }}>
            <h2 className="section-title animate-on-scroll">Featured Projects</h2>
            <div className="projects-grid">
                {[...projects].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map((project, index) => (
                    <article key={index} id={project.slug} className="project-card card animate-on-scroll">
                        {project.cover_image && (
                            <div className="project-image-container">
                                <img src={project.cover_image} alt={`${project.title} screenshot`} className="project-image" />
                            </div>
                        )}
                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tags">
                                {(project.tech_stack_names || []).map((tech, tIndex) => (
                                    <span key={tIndex} className="tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                                        <i className="ri-external-link-line"></i> Live Demo
                                    </a>
                                )}
                                {project.github_url && (
                                    <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
                                        <i className="ri-github-line"></i> GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
