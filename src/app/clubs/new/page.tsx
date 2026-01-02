"use client";

import { useActionState } from "react";
import { createClub } from "@/actions/clubs";

export default function CreateClubPage() {
    const [state, formAction, isPending] = useActionState(async (_prev: any, formData: FormData) => {
        return await createClub(formData);
    }, null);

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '0 1rem' }}>
            <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                Launch Your Club
            </h1>

            <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Club Name</label>
                        <input name="name" required className="glass-input" placeholder="e.g. AI Innovators" />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                        <select name="category" className="glass-input">
                            <option value="Technology">Technology</option>
                            <option value="Arts">Arts & Culture</option>
                            <option value="Sports">Sports</option>
                            <option value="Academic">Academic</option>
                            <option value="Social">Social</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            name="description"
                            required
                            rows={5}
                            className="glass-input"
                            placeholder="What is your club about?"
                        />
                    </div>

                    {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}

                    <button type="submit" disabled={isPending} className="glass-button" style={{ marginTop: '1rem' }}>
                        {isPending ? "Creating..." : "🚀 Launch Club"}
                    </button>
                </form>
            </div>

            <style jsx>{`
        .glass-input {
          width: 100%;
          padding: 1rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: white;
          outline: none;
          font-family: inherit;
        }
        .glass-input:focus {
          border-color: #a855f7;
          background: rgba(255,255,255,0.08);
        }
        select.glass-input option {
          background: #1a1a1a;
        }
      `}</style>
        </div>
    );
}
