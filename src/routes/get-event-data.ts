import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function getEventData(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            title: z.string(),
            details: z.string().nullable(),
            slug: z.string(),
            maximumAttendees: z.number().int().nullable(),
            attendeesAmount: z.number().int(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params

      const eventInformation = await prisma.event.findUnique({
        select: {
          id: true,
          title: true,
          details: true,
          slug: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendees: true,
            },
          },
        },
        where: {
          id: eventId,
        },
      })

      if (eventInformation === null) {
        throw new Error('Event not found.')
      }

      return reply.status(200).send({
        id: eventInformation.id,
        title: eventInformation.title,
        details: eventInformation.details,
        slug: eventInformation.slug,
        maximumAttendees: eventInformation.maximumAttendees,
        attendeesAmount: eventInformation._count.attendees,
      })
    },
  )
}
