"use client";
import useScrollReveal from '@/hooks/useScrollReveal';
import projectsData from '@/data/projects.json';

// Note: Metadata in Client Components must be exported from a separate file or handled in the layout.
// However, since we're using static export, we can keep the page as is and ensure the RootLayout covers basic SEO,
// or we could split this into a Server Component wrapper if we needed granular page-level metadata.
// For now, we will stick to the functional requirement and ensure the build passes.

export default function Projects() {
    useScrollReveal();

    return (
        <section id="projects" className="container" style={{ marginTop: '8rem' }}>
            <h2 className="section-title animate-on-scroll">Featured Projects</h2>
            <div className="projects-grid">
                {[...projectsData.projects].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map((project, index) => (
                    <div key={index} id={project.slug} className="project-card card animate-on-scroll">
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
                    </div>
                ))}
            </div>
        </section>
    );
}
