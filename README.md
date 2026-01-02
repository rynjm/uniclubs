# University Clubs Platform

## Project Structure
- `frontend/`: The Next.js web application.
- `backend/`: (Currently empty).

## 🚀 How to Fix "404: NOT_FOUND" on Vercel

By default, Vercel tries to deploy the root folder. Since your app is inside `frontend/`, you must update the settings:

1.  Go to your Vercel **Project Dashboard**.
2.  Click on **Settings** (top menu).
3.  In the **General** tab, find the **Root Directory** section.
4.  Click **Edit** and change it from `.` to `frontend`.
5.  Click **Save**.
6.  Go to the **Deployments** tab and **Redeploy** the latest commit.

## ⚠️ Database Warning (SQLite on Vercel)

This project is currently configured with **SQLite** (`dev.db`).

*   **Issue**: Vercel is a serverless platform with a read-only file system. Your database file (`dev.db`) will NOT be writable in production, and any data (users, clubs) you have locally will not persist or update reliably on Vercel.
*   **Solution**: For a working production app, you should switch `prisma/schema.prisma` to use **PostgreSQL** or **MySQL** and connect to a hosted database (like Supabase, Neon, or PlanetScale).
