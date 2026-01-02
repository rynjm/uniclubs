"use client";

import { useState } from "react";

const IDEAS = [
    { title: "24h AI Hackathon", desc: "Teams compete to build the best AI agent for campus navigation.", type: "Tech" },
    { title: "Retro Gaming Night", desc: "Set up emulators and compete in classic 90s games.", type: "Social" },
    { title: "Startup Pitch Deck", desc: "Workshop on creating the perfect pitch for VCs.", type: "Business" },
    { title: "Sustainable Campus Walk", desc: "Identify areas for green improvement on campus.", type: "Environment" },
    { title: "Robot Wars", desc: "Build mini-bots and battle them in a custom arena.", type: "Engineering" }
];

export default function AIGenerator() {
    const [loading, setLoading] = useState(false);
    const [idea, setIdea] = useState<null | typeof IDEAS[0]>(null);

    const generateIdea = () => {
        setLoading(true);
        setIdea(null);
        setTimeout(() => {
            const random = IDEAS[Math.floor(Math.random() * IDEAS.length)];
            setIdea(random);
            setLoading(false);
        }, 1500);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>
                AI Activity Generator
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Powerful AI engine to spark your next club event.
            </p>

            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>Club Type</label>
                    <select style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        color: 'white'
                    }}>
                        <option>Technology & Coding</option>
                        <option>Business & Entrepreneurship</option>
                        <option>Arts & Design</option>
                    </select>
                </div>

                <button
                    onClick={generateIdea}
                    disabled={loading}
                    className="glass-button"
                    style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}
                >
                    {loading ? "Analyzing Trends..." : "Generate Concept"}
                </button>

                {/* Result Area */}
                <div style={{ marginTop: '3rem', minHeight: '150px' }}>
                    {idea && (
                        <div className="glass-panel" style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                            padding: '2rem',
                            animation: 'fadeIn 0.5s ease'
                        }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '0.25rem 0.75rem',
                                background: 'var(--primary-gradient)',
                                borderRadius: '99px',
                                fontSize: '0.8rem',
                                marginBottom: '1rem'
                            }}>
                                {idea.type}
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{idea.title}</h2>
                            <p style={{ color: 'var(--text-muted)' }}>{idea.desc}</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
