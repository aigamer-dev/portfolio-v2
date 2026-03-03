/**
 * resolveLink — resolves internal cross-references in JSON data.
 *
 * Format:  "page:slug"  e.g. "projects:repomind"
 * Resolves to:  /projects#repomind
 *
 * Supported pages: projects, updates, awards, experience
 *
 * All other URLs (http/https) are returned as-is.
 */
export function resolveLink(url) {
    if (!url) return '#';

    // Detect internal ref pattern: page:slug
    const internalPattern = /^(projects|updates|awards|experience|contact):(.+)$/;
    const match = url.match(internalPattern);

    if (match) {
        const [, page, slug] = match;
        return `/${page}#${slug}`;
    }

    return url;
}

/**
 * isInternalLink — returns true if the url is an internal cross-reference.
 */
export function isInternalLink(url) {
    if (!url) return false;
    return /^(projects|updates|awards|experience|contact):.+$/.test(url);
}

/**
 * getLinkIcon — picks the right Remixicon class for a link based on text or URL.
 */
export function getLinkIcon(text = '', url = '') {
    const t = text.toLowerCase();
    const u = url.toLowerCase();

    if (isInternalLink(url)) return 'ri-arrow-right-line';
    if (t.includes('linkedin') || u.includes('linkedin')) return 'ri-linkedin-box-line';
    if (t.includes('youtube') || u.includes('youtube')) return 'ri-youtube-line';
    if (t.includes('blog') || t.includes('medium') || u.includes('medium')) return 'ri-medium-line';
    if (t.includes('demo') || t.includes('live')) return 'ri-external-link-line';
    if (t.includes('github') || u.includes('github')) return 'ri-github-line';
    if (t.includes('event') || t.includes('hackathon')) return 'ri-calendar-event-line';
    if (t.includes('post') || t.includes('view')) return 'ri-external-link-line';
    return 'ri-link';
}
