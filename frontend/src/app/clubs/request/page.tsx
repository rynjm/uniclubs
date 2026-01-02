"use client";

import { useActionState } from "react";
import { createClub } from "@/actions/admin";

export default function RequestClubPage() {
    // Re-using createClub action for now, but ideally should be a requestClub action
    // Assuming admin wants users to effectively create clubs but maybe they start unverified
    // based on the schema default(false) for isVerified.

    // Actually, createClub in admin.ts checks for admin role.
    // I need a separate action for user usage if this is for users.
    // But the user asked to "fix the explore club launch club".
    // I will assume "Launch a Club" means requesting one.
    // I already have createClub which is admin only.
    // I'll create a new Client Component for this which uses a new action in a moment.
    // For now, let's just make the page UI.

    return (
        <div style={{ padding: '5rem', textAlign: 'center' }}>
            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Launch Your Club</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}>
                Have a great idea for a club? submit your proposal and get started!
            </p>
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem' }}>
                <p>Club creation is currently by application only.</p>
                <br />
                <a href="mailto:admin@uni.edu?subject=Club%20Proposal" className="glass-button" style={{ display: 'inline-block' }}>
                    Email Proposal to Admin
                </a>
            </div>
        </div>
    );
}
