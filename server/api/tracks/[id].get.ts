import { eq, asc } from 'drizzle-orm'
import { db } from '../../db'
import { tracks, stems } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing track id' })
  }

  const result = await db.query.tracks.findFirst({
    where: eq(tracks.id, id),
    with: {
      stems: {
        orderBy: [asc(stems.sortOrder)],
      },
    },
  })

  if (!result) {
    throw createError({ statusCode: 404, message: 'Track not found' })
  }

  return result
})
