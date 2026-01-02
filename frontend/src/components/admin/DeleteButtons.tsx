'use client'

import { deleteClub, deleteUser } from "@/actions/admin"
import { useTransition } from "react"

export function DeleteClubButton({ clubId }: { clubId: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => startTransition(() => deleteClub(clubId))}
            disabled={isPending}
            style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
            }}
        >
            {isPending ? '...' : 'Delete'}
        </button>
    )
}

export function DeleteUserButton({ userId }: { userId: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <button
            onClick={() => startTransition(() => deleteUser(userId))}
            disabled={isPending}
            style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.8rem'
            }}
        >
            {isPending ? '...' : 'Delete'}
        </button>
    )
}
