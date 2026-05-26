import { db } from '../../db'
import { stems } from '../../db/schema'
import { asc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db.query.tracks.findMany({
    with: {
      stems: {
        orderBy: [asc(stems.sortOrder)],
      },
    },
    orderBy: (tracks, { desc }) => [desc(tracks.createdAt)],
  })

  return result
})
