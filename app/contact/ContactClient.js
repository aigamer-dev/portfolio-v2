"use client";
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactClient({ socialLinks }) {
    useScrollReveal();

    const getIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'github': return 'ri-github-line';
            case 'linkedin': return 'ri-linkedin-line';
            case 'twitter':
            case 'x': return 'ri-twitter-x-line';
            case 'medium': return 'ri-medium-line';
            case 'kaggle': return 'ri-bar-chart-box-line';
            case 'email': return 'ri-mail-line';
            default: return 'ri-link';
        }
    };

    return (
        <section id="contact" className="container" style={{ marginTop: '8rem', marginBottom: '8rem' }}>
            <h2 className="section-title animate-on-scroll">Let's Connect</h2>
            <div className="card animate-on-scroll">
                <div className="contact-content">
                    <p className="contact-text">
                        I'm always open to discussing new projects, AI agent workflows, or just talking shop about
                        the future of software engineering.
                    </p>
                    <div className="social-pills">
                        {socialLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="social-pill"
                            >
                                <i className={getIcon(link.platform)}></i>
                                <span>{link.platform}</span>
                            </a>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a href="mailto:contact@aigamer.dev" className="btn btn-primary btn-lg">
                            <i className="ri-send-plane-fill"></i> Send an Email
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
