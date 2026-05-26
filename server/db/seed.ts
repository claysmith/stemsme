import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { tracks, stems } from './schema'

const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/stemsme'

async function seed() {
  const client = postgres(connectionString, { prepare: false })
  const db = drizzle(client)

  console.log('Seeding database...')

  // Clear existing data
  await db.delete(stems)
  await db.delete(tracks)

  const trackRows = await db
    .insert(tracks)
    .values([
      {
        title: 'Neon Dreams',
        artist: 'Synthwave Kid',
        artwork:
          'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
        price: '14.99',
        description:
          'A lush synthwave track with warm analog synths and driving beats. Perfect for remixing.',
        bpm: 128,
        key: 'Am',
        genre: 'Synthwave',
      },
      {
        title: 'Midnight Blues',
        artist: 'Delta Rhythm',
        artwork:
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
        price: '19.99',
        description:
          'Soulful blues with a modern twist. Rich guitar layers and velvet vocals.',
        bpm: 90,
        key: 'E7',
        genre: 'Blues',
      },
      {
        title: 'Digital Rain',
        artist: 'CyberPulse',
        artwork:
          'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=400&fit=crop',
        price: '12.99',
        description:
          'Dark cyberpunk industrial techno. Heavy bass and glitched textures.',
        bpm: 140,
        key: 'Dm',
        genre: 'Techno',
      },
      {
        title: 'Sunset Groove',
        artist: 'Funk Collective',
        artwork:
          'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
        price: '16.99',
        description:
          'Funky disco grooves with tight horns and a slapping bassline.',
        bpm: 110,
        key: 'Gm',
        genre: 'Funk',
      },
      {
        title: 'Acoustic Morning',
        artist: 'Willow & Sage',
        artwork:
          'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
        price: '9.99',
        description:
          'Gentle acoustic folk with intimate vocals and fingerpicked guitar.',
        bpm: 75,
        key: 'C',
        genre: 'Folk',
      },
      {
        title: 'Urban Flow',
        artist: 'MC Drift',
        artwork:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        price: '24.99',
        description:
          'Hard-hitting hip-hop with boom bap drums and smooth samples.',
        bpm: 95,
        key: 'D',
        genre: 'Hip-Hop',
      },
      {
        title: 'Cosmic Drift',
        artist: 'Ambient Waves',
        artwork:
          'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&h=400&fit=crop',
        price: '11.99',
        description:
          'Ethereal ambient soundscapes for deep focus and meditation.',
        bpm: 60,
        key: 'F',
        genre: 'Ambient',
      },
    ])
    .returning({ id: tracks.id })

  const stemData: (typeof stems.$inferInsert)[] = [
    // Neon Dreams
    { trackId: trackRows[0].id, name: 'Drums', color: '#ef4444', frequency: 60, waveform: 'sawtooth', sortOrder: 0 },
    { trackId: trackRows[0].id, name: 'Bass', color: '#f97316', frequency: 110, waveform: 'sawtooth', sortOrder: 1 },
    { trackId: trackRows[0].id, name: 'Synth Pad', color: '#22c55e', frequency: 261.63, waveform: 'sine', sortOrder: 2 },
    { trackId: trackRows[0].id, name: 'Arpeggio', color: '#3b82f6', frequency: 392, waveform: 'triangle', sortOrder: 3 },
    { trackId: trackRows[0].id, name: 'Lead', color: '#a855f7', frequency: 523.25, waveform: 'sawtooth', sortOrder: 4 },
    // Midnight Blues
    { trackId: trackRows[1].id, name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sawtooth', sortOrder: 0 },
    { trackId: trackRows[1].id, name: 'Bass', color: '#f97316', frequency: 82.41, waveform: 'sine', sortOrder: 1 },
    { trackId: trackRows[1].id, name: 'Rhythm Guitar', color: '#22c55e', frequency: 164.81, waveform: 'triangle', sortOrder: 2 },
    { trackId: trackRows[1].id, name: 'Lead Guitar', color: '#14b8a6', frequency: 329.63, waveform: 'sawtooth', sortOrder: 3 },
    { trackId: trackRows[1].id, name: 'Vocals', color: '#a855f7', frequency: 440, waveform: 'sine', sortOrder: 4 },
    { trackId: trackRows[1].id, name: 'Piano', color: '#3b82f6', frequency: 261.63, waveform: 'triangle', sortOrder: 5 },
    // Digital Rain
    { trackId: trackRows[2].id, name: 'Kick', color: '#ef4444', frequency: 50, waveform: 'sawtooth', sortOrder: 0 },
    { trackId: trackRows[2].id, name: 'Bass', color: '#f97316', frequency: 73.42, waveform: 'sawtooth', sortOrder: 1 },
    { trackId: trackRows[2].id, name: 'Synth', color: '#22c55e', frequency: 220, waveform: 'sawtooth', sortOrder: 2 },
    { trackId: trackRows[2].id, name: 'Percussion', color: '#3b82f6', frequency: 1000, waveform: 'triangle', sortOrder: 3 },
    { trackId: trackRows[2].id, name: 'FX', color: '#a855f7', frequency: 800, waveform: 'sawtooth', sortOrder: 4 },
    // Sunset Groove
    { trackId: trackRows[3].id, name: 'Drums', color: '#ef4444', frequency: 65, waveform: 'sawtooth', sortOrder: 0 },
    { trackId: trackRows[3].id, name: 'Bass', color: '#f97316', frequency: 98, waveform: 'sawtooth', sortOrder: 1 },
    { trackId: trackRows[3].id, name: 'Guitar', color: '#22c55e', frequency: 196, waveform: 'triangle', sortOrder: 2 },
    { trackId: trackRows[3].id, name: 'Keys', color: '#3b82f6', frequency: 392, waveform: 'triangle', sortOrder: 3 },
    { trackId: trackRows[3].id, name: 'Horns', color: '#a855f7', frequency: 466.16, waveform: 'sawtooth', sortOrder: 4 },
    { trackId: trackRows[3].id, name: 'Vocals', color: '#ec4899', frequency: 587.33, waveform: 'sine', sortOrder: 5 },
    // Acoustic Morning
    { trackId: trackRows[4].id, name: 'Acoustic Guitar', color: '#22c55e', frequency: 261.63, waveform: 'triangle', sortOrder: 0 },
    { trackId: trackRows[4].id, name: 'Vocals', color: '#a855f7', frequency: 392, waveform: 'sine', sortOrder: 1 },
    { trackId: trackRows[4].id, name: 'Bass', color: '#f97316', frequency: 130.81, waveform: 'sine', sortOrder: 2 },
    { trackId: trackRows[4].id, name: 'Percussion', color: '#ef4444', frequency: 200, waveform: 'triangle', sortOrder: 3 },
    { trackId: trackRows[4].id, name: 'Strings', color: '#3b82f6', frequency: 523.25, waveform: 'sine', sortOrder: 4 },
    // Urban Flow
    { trackId: trackRows[5].id, name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sawtooth', sortOrder: 0 },
    { trackId: trackRows[5].id, name: '808 Bass', color: '#f97316', frequency: 73.42, waveform: 'sawtooth', sortOrder: 1 },
    { trackId: trackRows[5].id, name: 'Sample', color: '#22c55e', frequency: 261.63, waveform: 'triangle', sortOrder: 2 },
    { trackId: trackRows[5].id, name: 'Keys', color: '#3b82f6', frequency: 329.63, waveform: 'sine', sortOrder: 3 },
    { trackId: trackRows[5].id, name: 'Vocals', color: '#a855f7', frequency: 440, waveform: 'sawtooth', sortOrder: 4 },
    // Cosmic Drift
    { trackId: trackRows[6].id, name: 'Pad', color: '#22c55e', frequency: 174.61, waveform: 'sine', sortOrder: 0 },
    { trackId: trackRows[6].id, name: 'Texture', color: '#3b82f6', frequency: 349.23, waveform: 'sine', sortOrder: 1 },
    { trackId: trackRows[6].id, name: 'Bass Drone', color: '#f97316', frequency: 87.31, waveform: 'sine', sortOrder: 2 },
    { trackId: trackRows[6].id, name: 'Melody', color: '#a855f7', frequency: 698.46, waveform: 'triangle', sortOrder: 3 },
  ]

  await db.insert(stems).values(stemData)

  console.log(`Seeded ${trackRows.length} tracks with ${stemData.length} stems`)
  await client.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
