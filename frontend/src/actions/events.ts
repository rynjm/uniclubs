'use server'

import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { getSessionUser } from './auth'

export async function createEvent(formData: FormData) {
    const user = await getSessionUser()
    if (!user) {
        return { error: 'You must be logged in to create an event' }
    }

    const title = formData.get('title') as string
    const dateStr = formData.get('date') as string
    const location = formData.get('location') as string
    const description = formData.get('description') as string

    if (!title || !dateStr || !location) {
        return { error: 'Please fill in required fields' }
    }

    try {
        await db.event.create({
            data: {
                title,
                date: new Date(dateStr),
                location,
                description,
                creatorId: user.id
            }
        })
    } catch (e) {
        console.error(e)
        return { error: 'Failed to create event' }
    }

    redirect('/')
}
