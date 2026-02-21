"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Section from "./Section";

type Stage = {
    n: string;
    title: string;
    desc: string;
    color: string;
    glow: string;
};

const stages: Stage[] = [
    {
        n: "01",
        title: "NOISE",
        desc: "Raw outputs from 15+ AI providers. Contradictions, agreements, gaps.",
        color: "rgba(248,113,113,1)", // red-400
        glow: "rgba(248,113,113,0.35)",
    },
    {
        n: "02",
        title: "EMERGENCE",
        desc: "Patterns detected across responses. Cross-domain connections surface.",
        color: "rgba(167,139,250,1)", // violet-400
        glow: "rgba(167,139,250,0.35)",
    },
    {
        n: "03",
        title: "CONSENSUS",
        desc: "Semantic analysis identifies agreement, weighs confidence, resolves contradictions.",
        color: "rgba(96,165,250,1)", // blue-400
        glow: "rgba(96,165,250,0.35)",
    },
    {
        n: "04",
        title: "SPINE",
        desc: "Unified intelligence output. Something no single AI could produce alone.",
        color: "rgba(245,158,11,1)", // gold-ish
        glow: "rgba(245,158,11,0.35)",
    },
];

export default function EmergenceEngineSection() {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // Sequential activation
    useEffect(() => {
        if (!inView) return;

        let i = 0;
        let timeout: NodeJS.Timeout;

        const runSequence = () => {
            setActiveIndex(i);

            if (i < stages.length - 1) {
                i++;
                timeout = setTimeout(runSequence, 2000); // 1s per stage
            } else {
                // Hold on final stage longer
                timeout = setTimeout(() => {
                    setActiveIndex(-1); // fade out
                    i = 0;

                    timeout = setTimeout(runSequence, 1800); // pause before restart
                }, 1500); // hold SPINE 1.5s
            }
        };

        runSequence();

        return () => clearTimeout(timeout);
    }, [inView]);


    // Particle flow canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = 0;
        let h = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            w = r.width;
            h = r.height;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(wrap);

        type Particle = {
            x: number;
            y: number;
            vx: number;
            life: number;
            max: number;
        };

        const particles: Particle[] = [];

        const spawn = () => {
            if (activeIndex < 0) return;

            const stageWidth = w / stages.length;
            const startX = stageWidth * activeIndex + stageWidth * 0.5;
            const y = h * 0.45 + Math.random() * 40 - 20;

            particles.push({
                x: startX,
                y,
                vx: 1.5 + Math.random() * 1.5,
                life: 0,
                max: 60,
            });
        };

        const step = () => {
            ctx.clearRect(0, 0, w, h);

            if (activeIndex >= 0 && activeIndex < stages.length - 1) {
                spawn();
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.life++;
                p.x += p.vx;

                const alpha = 1 - p.life / p.max;

                ctx.fillStyle = `rgba(29,78,216,${alpha * 1})`; // blue-700
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fill();

                if (p.life >= p.max) particles.splice(i, 1);
            }

            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [activeIndex]);

    return (
        <Section className="py-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10">
                    <h2 className="mt-4 font-display text-6xl leading-[1.02] tracking-tight text-[rgb(var(--text))]">
                        The Emergence Engine
                    </h2>

                    <p className="mt-4 max-w-3xl text-lg italic text-[rgb(var(--muted))]">
                        How intelligence emerges from the synthesis of multiple AI perspectives
                    </p>
                </div>

                <div ref={wrapRef} className="relative">
                    <canvas
                        ref={canvasRef}
                        className="pointer-events-none absolute inset-0"
                    />

                    <div
                        ref={ref}
                        className="relative grid gap-6 md:grid-cols-4"
                    >
                        {stages.map((stage, i) => (
                            <motion.div
                                key={stage.n}
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                    activeIndex >= i
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0.3, y: 10 }
                                }
                                transition={{ duration: 0.4 }}
                                className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/20 p-8 backdrop-blur"
                                style={{
                                    boxShadow:
                                        activeIndex === i
                                            ? `0 0 30px ${stage.glow}`
                                            : "none",
                                }}
                            >
                                <div
                                    className="text-3xl font-semibold"
                                    style={{ color: stage.color }}
                                >
                                    {stage.n}
                                </div>

                                <div className="mt-4 text-2xl font-semibold tracking-tight">
                                    {stage.title}
                                </div>

                                <p className="mt-6 text-sm leading-relaxed text-[rgb(var(--muted))]">
                                    {stage.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
