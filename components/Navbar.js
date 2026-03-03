"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (pathname !== '/') return;

            const sections = document.querySelectorAll('section, header.hero');
            let current = 'home';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id') || 'home';
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const navLinks = [
        { name: 'About', href: '/#about', section: 'about' },
        { name: 'Experience', href: '/#experience', section: 'experience' },
        { name: 'Skills', href: '/#skills', section: 'skills' },
        { name: 'Updates', href: '/updates', section: 'updates' },
        { name: 'Awards', href: '/awards', section: 'awards' },
        { name: 'Projects', href: '/projects', section: 'projects' },
        { name: 'Contact', href: '/contact', section: 'contact' },
    ];

    const isActive = (link) => {
        if (pathname === '/' && link.href.startsWith('/#')) {
            return activeSection === link.section;
        }
        return pathname === link.href;
    };

    return (
        <header>
            <div className="container nav-container">
                <Link href="/" className="logo">
                    <img src="/images/logo.png" alt="AIGAMER Logo" style={{ height: '3rem', width: 'auto', verticalAlign: 'middle', borderRadius: '0.25rem' }} />
                </Link>
                <div className={`nav-links ${isOpen ? 'nav-open' : ''}`} id="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`nav-link ${isActive(link) ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        id="menu-toggle"
                        className="menu-toggle"
                        aria-label="Toggle Menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i className={isOpen ? 'ri-close-line' : 'ri-menu-3-line'}></i>
                    </button>
                </div>
            </div>
        </header>
    );
}
