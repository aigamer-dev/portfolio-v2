"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';
import updatesData from '@/data/updates.json';
import { resolveLink, isInternalLink, getLinkIcon } from '@/lib/resolveLink';

export default function Updates() {
    const [mounted, setMounted] = useState(false);
    useScrollReveal();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="updates" className="container" style={{ marginTop: '8rem' }}>
            <h2 className="section-title animate-on-scroll">Latest Updates</h2>
            <p className="section-subtitle animate-on-scroll">Recent news, linked posts, and articles.</p>
            <div className="updates-grid">
                {updatesData.updates && updatesData.updates.length > 0 ? (
                    [...updatesData.updates].sort((a, b) => (b.order ?? 0) - (a.order ?? 0)).map((update, index) => (
                        <article key={index} id={update.slug} className="card update-card animate-on-scroll">
                            <div className="update-meta">
                                <span className={`source-pill ${update.type}`}>{update.type}</span>
                                <span className="update-date">{mounted ? update.date : '...'}</span>
                            </div>
                            <h3 className="update-title">{update.title}</h3>
                            <p className="update-description">{update.description}</p>
                            {update.links && update.links.length > 0 && (
                                <div className="update-actions">
                                    {update.links.map((link, lIndex) => {
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
                            {update.tags && (
                                <div className="update-tags">
                                    {update.tags.map((tag, tIndex) => (
                                        <span key={tIndex} className="tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))
                ) : (
                    <p className="animate-on-scroll">No updates found.</p>
                )}
            </div>
        </section>
    );
}
