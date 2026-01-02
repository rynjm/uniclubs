"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/actions/auth";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(async (_prev: any, formData: FormData) => {
        return await login(formData);
    }, null);

    return (
        <div style={{ maxWidth: '400px', margin: '6rem auto', padding: '0 1rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                    Welcome Back
                </h1>

                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="student@uni.edu"
                            defaultValue="admin@uni.edu" // Pre-filled for demo
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            defaultValue="admin-password" // Pre-filled for demo
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    {state?.error && (
                        <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="glass-button"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {isPending ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link href="/register" style={{ color: 'var(--text-main)', cursor: 'pointer' }}>Register</Link>
                </p>
            </div>
        </div>
    );
}
