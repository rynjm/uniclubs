"use client";

import { useActionState } from "react";
import { createReport } from "@/actions/admin";

export default function ReportPage() {
    const [state, formAction, isPending] = useActionState(async (_prev: any, formData: FormData) => {
        return await createReport(formData);
    }, null);

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
                    Report an Issue
                </h1>

                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Reason</label>
                        <select
                            name="reason"
                            required
                            className="glass-input"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'white' }}
                        >
                            <option value="Spam">Spam</option>
                            <option value="Inappropriate Content">Inappropriate Content</option>
                            <option value="Harassment">Harassment</option>
                            <option value="Bug">Bug Report</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Details</label>
                        <textarea
                            name="details"
                            rows={4}
                            required
                            placeholder="Please provide specific details..."
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
                        {isPending ? "Submitting..." : "Submit Report"}
                    </button>
                </form>
            </div>
        </div>
    );
}
