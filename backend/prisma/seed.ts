import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Initialize Prisma client exactly as in db.ts
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})
const prisma = new PrismaClient({ adapter })

// Map numeric EventRole (1-4) to Prisma's string enum
const eventRoleMap: Record<number, string> = {
  1: 'SUPER_ADMIN',
  2: 'EVENT_ADMIN',
  3: 'SPORT_COORDINATOR',
  4: 'PARTICIPANT',
}

async function main() {
  console.log('Start seeding...')

  // 1. Create or Update 3 mock users safely using upsert to avoid P2002 email collisions
  const [adminUser, coordinatorUser, participantUser] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'System Admin',
        email: 'admin@example.com',
        role: 'ADMIN',
      },
    }),
    prisma.user.upsert({
      where: { email: 'coordinator@example.com' },
      update: {},
      create: {
        name: 'Event Coordinator',
        email: 'coordinator@example.com',
        role: 'ORGANIZER',
      },
    }),
    prisma.user.upsert({
      where: { email: 'participant@example.com' },
      update: {},
      create: {
        name: 'Standard Participant',
        email: 'participant@example.com',
        role: 'ATTENDEE',
      },
    }),
  ])

  console.log(`Created users: ${adminUser.name}, ${coordinatorUser.name}, ${participantUser.name}`)
  
  // Create 2 mock events
  const [event1, event2] = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Summer Soccer Tournament',
        description: 'Annual summer soccer tournament for local teams',
        date: new Date('2026-08-15T10:00:00Z'),
        venue: 'City Stadium',
        maxParticipants: 100,
      },
    }),
    prisma.event.create({
      data: {
        title: 'Basketball Clinic',
        description: 'Free basketball skills clinic for youth',
        date: new Date('2026-09-01T14:00:00Z'),
        venue: 'Community Center Gym',
        maxParticipants: 50,
      },
    }),
  ])

  console.log(`Created events: ${event1.title}, ${event2.title}`)

  // Create role assignments
  await Promise.all([
    // Event 1 roles
    prisma.roleAssignment.create({
      data: {
        userId: adminUser.id,
        eventId: event1.id,
        role: eventRoleMap[1] as any, // SUPER_ADMIN
      },
    }),
    prisma.roleAssignment.create({
      data: {
        userId: coordinatorUser.id,
        eventId: event1.id,
        role: eventRoleMap[3] as any, // SPORT_COORDINATOR
      },
    }),
    prisma.roleAssignment.create({
      data: {
        userId: participantUser.id,
        eventId: event1.id,
        role: eventRoleMap[4] as any, // PARTICIPANT
      },
    }),
    // Event 2 roles
    prisma.roleAssignment.create({
      data: {
        userId: adminUser.id,
        eventId: event2.id,
        role: eventRoleMap[1] as any, // SUPER_ADMIN
      },
    }),
    prisma.roleAssignment.create({
      data: {
        userId: coordinatorUser.id,
        eventId: event2.id,
        role: eventRoleMap[2] as any, // EVENT_ADMIN
      },
    }),
  ])

  console.log('Role assignments created')
  console.log('Seeding completed!')
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
