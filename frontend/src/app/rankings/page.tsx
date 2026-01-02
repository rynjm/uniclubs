import db from "@/lib/db";
import Link from "next/link";

export default async function RankingsPage() {
    const clubs = await db.club.findMany({
        orderBy: { members: 'desc' },
        take: 10
    });

    return (
        <div style={{ padding: '4rem 5%', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>
                Club Rankings
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                Top clubs by member count and activity.
            </p>

            <div className="glass-panel" style={{ padding: '0.5rem', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', width: '80px' }}>Rank</th>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Club Name</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Members</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.length > 0 ? (
                            clubs.map((club, index) => (
                                <tr key={club.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '1rem', textAlign: 'left' }}>
                                        <span style={{
                                            fontWeight: 700,
                                            fontSize: '1.2rem',
                                            color: index < 3 ? '#fbbf24' : 'inherit'
                                        }}>
                                            #{index + 1}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <Link href={`/clubs/${club.id}`} style={{ fontWeight: 600 }}>
                                            {club.name}
                                        </Link>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{club.category}</div>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>{club.members}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700 }}>
                                        {club.members * 10} {/* Mock Score Formula */}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No clubs to rank yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
