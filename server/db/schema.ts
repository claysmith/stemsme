import {
  pgTable,
  uuid,
  varchar,
  decimal,
  text,
  integer,
  real,
  timestamp,
} from 'drizzle-orm/pg-core'

export const tracks = pgTable('tracks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  artist: varchar('artist', { length: 255 }).notNull(),
  artwork: text('artwork').notNull().default(''),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
  description: text('description').notNull().default(''),
  bpm: integer('bpm').notNull().default(120),
  key: varchar('key', { length: 10 }).notNull().default('C'),
  genre: varchar('genre', { length: 100 }).notNull().default(''),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const stems = pgTable('stems', {
  id: uuid('id').defaultRandom().primaryKey(),
  trackId: uuid('track_id')
    .notNull()
    .references(() => tracks.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  color: varchar('color', { length: 7 }).notNull().default('#3b82f6'),
  frequency: real('frequency').notNull().default(440),
  waveform: varchar('waveform', { length: 20 }).notNull().default('sine'),
  fileUrl: text('file_url'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Track = typeof tracks.$inferSelect
export type NewTrack = typeof tracks.$inferInsert
export type Stem = typeof stems.$inferSelect
export type NewStem = typeof stems.$inferInsert
