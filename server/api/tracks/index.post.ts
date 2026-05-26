import { eq, asc } from 'drizzle-orm'
import { db } from '../../db'
import { tracks, stems, type NewTrack, type NewStem } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.title || !body.artist) {
    throw createError({
      statusCode: 400,
      message: 'title and artist are required',
    })
  }

  if (!body.stems?.length) {
    throw createError({
      statusCode: 400,
      message: 'at least one stem is required',
    })
  }

  const [track] = await db
    .insert(tracks)
    .values({
      title: body.title,
      artist: body.artist,
      artwork: body.artwork || '',
      price: String(body.price ?? 0),
      description: body.description || '',
      bpm: body.bpm ?? 120,
      key: body.key || 'C',
      genre: body.genre || '',
    } satisfies NewTrack)
    .returning()

  const stemRows = body.stems.map(
    (s: any, i: number) =>
      ({
        trackId: track.id,
        name: s.name,
        color: s.color || '#3b82f6',
        frequency: s.frequency ?? 440,
        waveform: s.waveform || 'sine',
        fileUrl: s.fileUrl || null,
        sortOrder: i,
      }) satisfies NewStem,
  )

  await db.insert(stems).values(stemRows)

  const result = await db.query.tracks.findFirst({
    where: eq(tracks.id, track.id),
    with: {
      stems: {
        orderBy: [asc(stems.sortOrder)],
      },
    },
  })

  setResponseStatus(event, 201)
  return result
})
