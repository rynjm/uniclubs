const { PrismaClient } = require('../src/generated/client')
const prisma = new PrismaClient()

async function main() {
    // Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@uni.edu' },
        update: {},
        create: {
            email: 'admin@uni.edu',
            name: 'Super Admin',
            role: 'admin',
            password: 'admin-password', // Simplified
        },
    })

    console.log({ admin })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
