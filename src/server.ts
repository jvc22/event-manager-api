import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { createEvent } from './routes/create-event'
import { registerForEvent } from './routes/register-for-event'
import { getEventData } from './routes/get-event-data'
import { getAttendeeBadge } from './routes/get-attendee-badge'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEventData)
app.register(getAttendeeBadge)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('🔥 HTTP Server Running on Port 3333'))
