"use client";

import { useActionState } from "react";
import { createAnnouncement } from "@/actions/admin";

export default function CreateAnnouncementPage() {
    const [state, formAction, isPending] = useActionState(async (_prev: any, formData: FormData) => {
        return await createAnnouncement(formData);
    }, null);

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    Broadcast Announcement
                </h1>

                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            placeholder="e.g. System Maintenance"
                            className="glass-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Content</label>
                        <textarea
                            name="content"
                            rows={6}
                            required
                            className="glass-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white', resize: 'vertical' }}
                        />
                    </div>

                    {state?.error && (
                        <div style={{ color: '#ef4444', textAlign: 'center' }}>{state.error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="glass-button"
                        style={{ justifyContent: 'center', marginTop: '1rem' }}
                    >
                        {isPending ? "Sending..." : "Broadcast"}
                    </button>
                </form>
            </div>
        </div>
    );
}
