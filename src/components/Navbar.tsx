"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";

const navItems = [
    { name: "Discover", path: "/" },
    { name: "Clubs", path: "/clubs" },
    { name: "Events", path: "/events" },
    { name: "Rankings", path: "/rankings" },
    { name: "AI Idea Gen", path: "/ai-generator" },
];

export default function Navbar({ user }: { user: any }) {
    const pathname = usePathname();

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '1200px',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100
        }}>
            <div style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.05em' }}>
                <span className="gradient-text">UniClubs</span>
            </div>

            <div style={{ display: 'flex', gap: '2rem' }}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        style={{
                            color: pathname === item.path ? 'var(--text-main)' : 'var(--text-muted)',
                            fontWeight: pathname === item.path ? 600 : 400,
                            transition: 'color 0.2s'
                        }}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link href="/events/new" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            ➕ Host Event
                        </Link>
                        <Link href="/report" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            🚩 Report Issue
                        </Link>
                        <Link href={user.role === 'admin' ? '/admin' : '/'} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            {user.name}
                        </Link>
                        <button
                            onClick={() => logout()}
                            className="glass-button"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'rgba(255,100,100,0.1)', borderColor: 'rgba(255,100,100,0.2)' }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="glass-button" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            Student Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
