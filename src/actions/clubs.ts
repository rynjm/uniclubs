'use server'

import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { getSessionUser } from './auth'

export async function createClub(formData: FormData) {
    const user = await getSessionUser()
    if (!user) return { error: 'You must be logged in' }

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    if (!name || !category || !description) {
        return { error: 'Please fill in all fields' }
    }

    try {
        const club = await db.club.create({
            data: {
                name,
                category,
                description,
                image: '/club-banner.png', // Default image for now
            }
        })

        // In a real app we might verify admin approval here
    } catch (e) {
        console.error(e)
        return { error: 'Failed to create club' }
    }

    redirect('/clubs')
}
