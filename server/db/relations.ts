import { relations } from 'drizzle-orm'
import { tracks, stems } from './schema'

export const tracksRelations = relations(tracks, ({ many }) => ({
  stems: many(stems),
}))

export const stemsRelations = relations(stems, ({ one }) => ({
  track: one(tracks, {
    fields: [stems.trackId],
    references: [tracks.id],
  }),
}))
