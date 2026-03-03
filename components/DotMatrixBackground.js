"use client";
import { useEffect, useRef } from 'react';

export default function DotMatrixBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let dots = [];
        const spacing = 28;
        const mouse = { x: -1000, y: -1000 };
        const radius = 150;

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            dots = [];
            for (let x = -spacing; x < width + spacing; x += spacing) {
                for (let y = -spacing; y < height + spacing; y += spacing) {
                    dots.push({
                        ox: x, oy: y,
                        x: x, y: y
                    });
                }
            }
        };

        let mouseTimeout;
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                mouse.x = -1000;
                mouse.y = -1000;
            }, 2000);
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#3c4043';

            for (let i = 0; i < dots.length; i++) {
                let p = dots[i];
                let dx = mouse.x - p.ox;
                let dy = mouse.y - p.oy;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < radius) {
                    let angle = Math.atan2(dy, dx);
                    let push = (radius - dist) / radius;
                    let targetX = p.ox - Math.cos(angle) * push * spacing * 1.5;
                    let targetY = p.oy - Math.sin(angle) * push * spacing * 1.5;

                    p.x += (targetX - p.x) * 0.15;
                    p.y += (targetY - p.y) * 0.15;
                } else {
                    p.x += (p.ox - p.x) * 0.1;
                    p.y += (p.oy - p.y) * 0.1;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', init);
        document.addEventListener('mousemove', handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener('resize', init);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
}
