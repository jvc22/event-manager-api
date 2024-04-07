import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'c2d90f01-cd8e-4707-8cc6-ff59d653fc5e',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'An event for people passionate about coding!',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('🌱 Database seeded')
  prisma.$disconnect()
})
