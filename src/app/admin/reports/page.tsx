import { resolveReport } from "@/actions/admin";
import db from "@/lib/db";
import { redirect } from "next/navigation";

// Mock Auth
const CURRENT_USER_EMAIL = 'admin@uni.edu';

export default async function ReportsPage() {
    const user = await db.user.findUnique({
        where: { email: CURRENT_USER_EMAIL }
    });

    if (!user || user.role !== 'admin') {
        redirect('/');
    }

    const reports = await db.report.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '3rem' }}>User Reports</h1>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                {reports.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No reports found.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {reports.map(report => (
                            <div key={report.id} style={{
                                padding: '1.5rem',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '12px',
                                border: '1px solid var(--glass-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{report.reason}</div>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{report.details}</p>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        Status: <span style={{ color: report.status === 'resolved' ? '#4ade80' : '#fbbf24' }}>{report.status}</span>
                                        {' • '}
                                        {report.createdAt.toLocaleDateString()}
                                    </div>
                                </div>
                                {report.status === 'pending' && (
                                    <form action={async () => {
                                        'use server'
                                        await resolveReport(report.id)
                                    }}>
                                        <button className="glass-button" style={{ fontSize: '0.9rem' }}>Mark Resolved</button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
