import Image from "next/image";
import db from "@/lib/db";
import { notFound } from "next/navigation";

export default async function ClubProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const club = await db.club.findUnique({
        where: { id },
        include: { events: true }
    });

    if (!club) return notFound();

    // Mock stats/achievements for now as they aren't in DB heavily yet
    const stats = { members: club.members, rank: 5 };
    const achievements = [{ title: "Newcomer", icon: "🌱" }];

    return (
        <div>
            {/* Heavy Hero Banner */}
            <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                <Image
                    src={club.image || '/club-banner.png'}
                    alt={club.name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--bg-dark), transparent)'
                }} />

                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '5%',
                    right: '5%',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: 800, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                        {club.name}
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px' }}>{club.description}</p>
                </div>
            </div>

            <div style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                {/* Left Column: Events & Feed */}
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Upcoming Events</h2>
                    {club.events.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)' }}>No upcoming events scheduled.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {club.events.map((event) => (
                                <div key={event.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{event.title}</h3>
                                        <p style={{ color: 'var(--text-muted)' }}>{event.date.toLocaleDateString()} • {event.location}</p>
                                    </div>
                                    <button className="glass-button" style={{ fontSize: '0.9rem' }}>Register</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Stats & Achievements */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Club Stats</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#a855f7' }}>{stats.members}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Members</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>{stats.rank}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Achievements</h3>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {achievements.map((ach, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span>{ach.icon}</span>
                                    <span>{ach.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
