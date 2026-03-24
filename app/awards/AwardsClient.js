"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';
import { resolveLink, isInternalLink, getLinkIcon } from '@/lib/resolveLink';

export default function AwardsClient({ awards }) {
    const [mounted, setMounted] = useState(false);
    useScrollReveal();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="awards" className="container" style={{ marginTop: '8rem' }}>
            <h2 className="section-title animate-on-scroll">Awards</h2>
            <div className="certifications-grid">
                {[...awards].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map((award, index) => (
                    <article key={index} id={award.slug} className="card award-card animate-on-scroll">
                        <div className="award-header">
                            <div className="award-badges">
                                {award.achievement && <span className="award-achievement">{award.achievement}</span>}
                                <span className="award-type">{award.type}</span>
                            </div>
                            <span className="award-date">{mounted ? award.date : '...'}</span>
                        </div>
                        <h3 className="award-title">{award.title}</h3>
                        <p className="award-description">{award.description}</p>
                        {award.links && award.links.length > 0 && (
                            <div className="award-links">
                                {award.links.map((link, lIndex) => {
                                    const href = resolveLink(link.url);
                                    const internal = isInternalLink(link.url);
                                    const icon = getLinkIcon(link.text, link.url);
                                    return internal ? (
                                        <Link key={lIndex} href={href} className="btn btn-sm btn-outline">
                                            <i className={icon}></i> {link.text}
                                        </Link>
                                    ) : (
                                        <a key={lIndex} href={href} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
                                            <i className={icon}></i> {link.text}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                        {award.tags && award.tags.length > 0 && (
                            <div className="award-tags">
                                {award.tags.map((tag, tIndex) => (
                                    <span key={tIndex} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
