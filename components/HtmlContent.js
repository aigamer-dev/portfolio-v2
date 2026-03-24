"use client";

import { useState, useEffect } from 'react';

export default function HtmlContent({ html }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <span suppressHydrationWarning>{html}</span>;
    }

    return <span dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />;
}
