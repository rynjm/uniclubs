'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Please fill in all fields' }
    }

    const user = await db.user.findUnique({
        where: { email }
    })

    // DEMO ONLY: Plain text comparison. In production, use bcrypt/argon2
    if (!user || user.password !== password) {
        return { error: 'Invalid credentials' }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('userId', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    redirect(user.role === 'admin' ? '/admin' : '/')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('userId')
    redirect('/')
}


export async function register(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    if (!email || !password || !name) {
        return { error: 'Please fill in all fields' }
    }

    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: 'User already exists' }
    }

    const user = await db.user.create({
        data: {
            email,
            password, // Plain text as per existing pattern
            name,
            role: 'student'
        }
    })

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('userId', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    redirect('/')
}

export async function getSessionUser() {
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    if (!userId) return null

    const user = await db.user.findUnique({
        where: { id: userId }
    })

    return user
}
