'use client';

import { useEffect, useState } from 'react';

export default function Loader() {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                // Ease-in-out progress: fast start, slow middle, fast end
                const remaining = 100 - prev;
                const increment = Math.max(0.5, remaining * 0.04);
                return Math.min(100, prev + increment);
            });
        }, 30);

        // Start fade out after 2.4s
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2400);

        // Remove from DOM after fade completes
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2900);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');

        .loader-root {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050510;
          font-family: 'Inter', sans-serif;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .loader-root.fade-out {
          opacity: 0;
          transform: scale(1.03);
          pointer-events: none;
        }

        /* ── Stars / Particles ── */
        .stars {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--dur) ease-in-out infinite;
          opacity: 0;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50%       { opacity: var(--opacity); transform: scale(1.2); }
        }

        /* ── Gradient blobs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: blobMove var(--dur) ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%);
          top: -100px; left: -100px;
          --dur: 7s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          --dur: 9s;
        }
        .blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%);
          top: 40%; left: 60%;
          --dur: 11s;
        }
        @keyframes blobMove {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }

        /* ── Centre stage ── */
        .center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        /* ── Orbit rings ── */
        .rings {
          position: relative;
          width: 160px;
          height: 160px;
        }
        .ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .ring-1 {
          border-top-color: #818cf8;
          border-right-color: rgba(129,140,248,0.3);
          animation: spin 1.6s linear infinite;
          box-shadow: 0 0 16px rgba(129,140,248,0.4);
        }
        .ring-2 {
          inset: 14px;
          border-top-color: #ec4899;
          border-left-color: rgba(236,72,153,0.3);
          animation: spin 2.4s linear infinite reverse;
          box-shadow: 0 0 12px rgba(236,72,153,0.35);
        }
        .ring-3 {
          inset: 28px;
          border-top-color: #38bdf8;
          border-bottom-color: rgba(56,189,248,0.3);
          animation: spin 3.2s linear infinite;
          box-shadow: 0 0 10px rgba(56,189,248,0.35);
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Inner glow orb ── */
        .orb {
          position: absolute;
          inset: 42px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%,
            rgba(129,140,248,0.9),
            rgba(236,72,153,0.6) 50%,
            rgba(56,189,248,0.4) 100%
          );
          box-shadow:
            0 0 40px rgba(129,140,248,0.6),
            0 0 80px rgba(236,72,153,0.3),
            inset 0 0 20px rgba(255,255,255,0.15);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.08); opacity: 0.85; }
        }

        /* ── Orbiting dot ── */
        .orbit-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          margin: -5px 0 0 -5px;
          background: white;
          box-shadow: 0 0 10px white, 0 0 20px rgba(129,140,248,0.8);
          animation: orbit 1.6s linear infinite;
          transform-origin: 0 -70px;
        }
        .orbit-dot-2 {
          width: 7px;
          height: 7px;
          margin: -3.5px 0 0 -3.5px;
          background: #ec4899;
          box-shadow: 0 0 8px #ec4899, 0 0 16px rgba(236,72,153,0.6);
          transform-origin: 0 -56px;
          animation: orbit 2.4s linear infinite reverse;
        }
        @keyframes orbit {
          to { transform: rotate(360deg) translateX(0); }
        }

        /* ── Glitch / shimmer text ── */
        .name-text {
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #818cf8 0%, #ec4899 40%, #38bdf8 80%, #818cf8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
          position: relative;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        .tagline {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.8);
          margin-top: 6px;
          animation: fadeInUp 0.8s 0.5s ease forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Progress bar ── */
        .progress-wrap {
          width: 260px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .progress-bar-track {
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #818cf8, #ec4899, #38bdf8);
          background-size: 200% 100%;
          animation: barShimmer 1.5s linear infinite;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(129,140,248,0.7);
        }
        @keyframes barShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.6);
          letter-spacing: 0.08em;
        }

        /* ── Floating dots decoration ── */
        .float-dot {
          position: absolute;
          border-radius: 50%;
          animation: floatUp var(--dur) ease-in-out infinite;
          opacity: 0;
        }
        @keyframes floatUp {
          0%   { opacity: 0;   transform: translateY(0) scale(0.5); }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.6; }
          100% { opacity: 0;   transform: translateY(-120px) scale(1.2); }
        }
      `}</style>

            <div className={`loader-root${fadeOut ? ' fade-out' : ''}`}>

                {/* Parallax background blobs */}
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />

                {/* Stars */}
                <div className="stars">
                    {Array.from({ length: 60 }).map((_, i) => (
                        <span
                            key={i}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 2 + 1}px`,
                                height: `${Math.random() * 2 + 1}px`,
                                '--dur': `${Math.random() * 3 + 2}s`,
                                '--opacity': `${Math.random() * 0.7 + 0.3}`,
                                animationDelay: `${Math.random() * 4}s`,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>

                {/* Floating particle dots */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <span
                        key={i}
                        className="float-dot"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            bottom: `${Math.random() * 30}%`,
                            width: `${Math.random() * 6 + 3}px`,
                            height: `${Math.random() * 6 + 3}px`,
                            background: ['#818cf8', '#ec4899', '#38bdf8', '#a78bfa'][i % 4],
                            '--dur': `${Math.random() * 2 + 2}s`,
                            animationDelay: `${Math.random() * 3}s`,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Centre content */}
                <div className="center">
                    {/* Spinning rings */}
                    <div className="rings">
                        <div className="ring ring-1" />
                        <div className="ring ring-2" />
                        <div className="ring ring-3" />
                        <div className="orb" />
                        <div className="orbit-dot" />
                        <div className="orbit-dot orbit-dot-2" />
                    </div>

                    {/* Name + tagline */}
                    <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
                        <div className="name-text">Ahad</div>
                        <div className="tagline">Portfolio &nbsp;·&nbsp; Loading</div>
                    </div>

                    {/* Progress */}
                    <div className="progress-wrap">
                        <div className="progress-bar-track">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="progress-label">
                            <span>Initialising</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
