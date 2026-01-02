'use server'

import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { getSessionUser } from './auth'
import { revalidatePath } from 'next/cache'

export async function createClub(formData: FormData) {
    const user = await getSessionUser()
    if (!user || user.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const name = formData.get('name') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    if (!name || !category) {
        return { error: 'Please fill in required fields' }
    }

    try {
        await db.club.create({
            data: {
                name,
                category,
                description,
                isVerified: true
            }
        })
    } catch (e) {
        return { error: 'Failed to create club' }
    }

    redirect('/admin')
}

export async function createAnnouncement(formData: FormData) {
    const user = await getSessionUser()
    if (!user || user.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if (!title || !content) {
        return { error: 'Please fill in required fields' }
    }

    try {
        await db.announcement.create({
            data: {
                title,
                content
            }
        })
    } catch (e) {
        return { error: 'Failed to create announcement' }
    }

    redirect('/admin')
}

export async function resolveReport(reportId: string) {
    const user = await getSessionUser()
    if (!user || user.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    await db.report.update({
        where: { id: reportId },
        data: { status: 'resolved' }
    })

    revalidatePath('/admin/reports')
}

export async function deleteClub(clubId: string) {
    const user = await getSessionUser()
    if (!user || user.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    try {
        await db.club.delete({
            where: { id: clubId }
        })
        revalidatePath('/admin')
    } catch (e) {
        return { error: 'Failed to delete club' }
    }
}

export async function deleteUser(userId: string) {
    const user = await getSessionUser()
    if (!user || user.role !== 'admin') {
        return { error: 'Unauthorized' }
    }

    try {
        await db.user.delete({
            where: { id: userId }
        })
        revalidatePath('/admin')
    } catch (e) {
        return { error: 'Failed to delete user' }
    }
}

export async function createReport(formData: FormData) {
    const user = await getSessionUser()
    if (!user) {
        return { error: 'You must be logged in to report' }
    }

    const reason = formData.get('reason') as string
    const details = formData.get('details') as string

    if (!reason || !details) {
        return { error: 'Please fill in required fields' }
    }

    try {
        await db.report.create({
            data: {
                reason,
                details,
                status: 'pending'
            }
        })
    } catch (e) {
        return { error: 'Failed to submit report' }
    }

    redirect('/')
}
