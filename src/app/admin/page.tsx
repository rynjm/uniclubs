import Link from "next/link";
import db from "@/lib/db";
import { User, Club } from "@prisma/client";
import { redirect } from "next/navigation";
import { DeleteClubButton, DeleteUserButton } from "@/components/admin/DeleteButtons";

// Mock Authentication (In real app, use useSession or cookies)
const CURRENT_USER_EMAIL = 'admin@uni.edu';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const user = await db.user.findUnique({
        where: { email: CURRENT_USER_EMAIL }
    });

    if (!user || user.role !== 'admin') {
        return (
            <div style={{ padding: '5rem', textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>Access Denied</h1>
                <p>You must be an admin to view this page.</p>
                <Link href="/" className="glass-button">Go Home</Link>
            </div>
        );
    }

    // Fetch Data
    const clubs = await db.club.findMany();
    const users = await db.user.findMany();

    return (
        <div style={{ padding: '4rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span>Welcome, {user.name}</span>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)', borderRadius: '50%' }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <StatCard title="Total Users" value={users.length} icon="👥" />
                <StatCard title="Active Clubs" value={clubs.length} icon="🏛️" />
                <StatCard title="System Status" value="Online" icon="🟢" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                    {/* Users Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Users Management</h2>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem 0' }}>Name</th>
                                    <th style={{ padding: '1rem 0' }}>Email</th>
                                    <th style={{ padding: '1rem 0' }}>Role</th>
                                    <th style={{ padding: '1rem 0' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u: User) => (
                                    <tr key={u.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem 0' }}>{u.name}</td>
                                        <td style={{ padding: '1rem 0' }}>{u.email}</td>
                                        <td style={{ padding: '1rem 0' }}>
                                            <span style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '99px',
                                                background: u.role === 'admin' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                                color: u.role === 'admin' ? '#d8b4fe' : 'inherit'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 0' }}>
                                            {u.email !== CURRENT_USER_EMAIL && (
                                                <DeleteUserButton userId={u.id} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Clubs Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Clubs Management</h2>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem 0' }}>Name</th>
                                    <th style={{ padding: '1rem 0' }}>Category</th>
                                    <th style={{ padding: '1rem 0' }}>Members</th>
                                    <th style={{ padding: '1rem 0' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clubs.map((c: Club) => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem 0' }}>{c.name}</td>
                                        <td style={{ padding: '1rem 0' }}>{c.category}</td>
                                        <td style={{ padding: '1rem 0' }}>{c.members}</td>
                                        <td style={{ padding: '1rem 0' }}>
                                            <DeleteClubButton clubId={c.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Quick Actions</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/admin/clubs/new" className="glass-button" style={{ justifyContent: 'flex-start' }}>➕ Add New Club</Link>
                        <Link href="/admin/announcements/new" className="glass-button" style={{ justifyContent: 'flex-start' }}>📢 Broadcast Announcement</Link>
                        <Link href="/admin/reports" className="glass-button" style={{ justifyContent: 'flex-start' }}>⚠️ Review Reports</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: string }) {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem' }}>{icon}</div>
            <div>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</div>
                <div style={{ color: 'var(--text-muted)' }}>{title}</div>
            </div>
        </div>
    );
}
