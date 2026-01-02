"use client";

import { useActionState } from "react";
import { createEvent } from "@/actions/events";

export default function CreateEventPage() {
    const [state, formAction, isPending] = useActionState(async (_prev: any, formData: FormData) => {
        return await createEvent(formData);
    }, null);

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    Create Event
                </h1>

                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Event Title</label>
                        <input
                            name="title"
                            type="text"
                            required
                            placeholder="e.g. Chess Tournament"
                            className="glass-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Date & Time</label>
                            <input
                                name="date"
                                type="datetime-local"
                                required
                                className="glass-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Location</label>
                            <input
                                name="location"
                                type="text"
                                required
                                placeholder="Student Center"
                                className="glass-input"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description</label>
                        <textarea
                            name="description"
                            rows={4}
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
                        {isPending ? "Creating Event..." : "Publish Event"}
                    </button>
                </form>
            </div>
        </div>
    );
}
