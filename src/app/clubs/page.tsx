import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";
import { Club } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function ClubsPage() {
    const clubs = await db.club.findMany();

    return (
        <div style={{ padding: '4rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Discover Clubs</h1>
                <Link href="/clubs/new">
                    <button className="glass-button">
                        + Launch Club
                    </button>
                </Link>
            </div>

            {clubs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No clubs found. Be the first to launch one!
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {clubs.map((club: Club) => (
                        <Link href={`/clubs/${club.id}`} key={club.id}>
                            <div className="glass-panel" style={{ overflow: 'hidden', height: '100%', transition: 'transform 0.2s' }}>
                                <div style={{ position: 'relative', height: '200px', width: '100%' }}>
                                    <Image
                                        src={club.image || '/club-banner.png'}
                                        alt={club.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(0,0,0,0.7)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px',
                                        fontSize: '0.8rem',
                                        backdropFilter: 'blur(4px)'
                                    }}>
                                        {club.category}
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{club.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                                        <span>{club.members} Members</span>
                                        <span>Active</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
