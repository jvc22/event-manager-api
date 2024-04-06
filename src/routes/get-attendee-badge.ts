import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../lib/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            name: z.string().min(4),
            email: z.string().email(),
            event: z.object({
              title: z.string(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendeeInformation = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
        where: {
          id: attendeeId,
        },
      })

      if (attendeeInformation === null) {
        throw new Error('Attendee not found.')
      }

      return reply.status(200).send({
        name: attendeeInformation.name,
        email: attendeeInformation.email,
        event: {
          title: attendeeInformation.event.title,
        },
      })
    },
  )
}
