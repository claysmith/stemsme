export interface StemDef {
  id: string
  name: string
  color: string
  frequency: number
  waveform: OscillatorType
  fileUrl?: string
}

export interface Track {
  id: string
  title: string
  artist: string
  artwork: string
  price: number
  description: string
  bpm: number
  key: string
  stems: StemDef[]
  genre: string
  createdAt?: string
}

const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Synthwave Kid',
    artwork: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    price: 14.99,
    description: 'A lush synthwave track with warm analog synths and driving beats.',
    bpm: 128,
    key: 'Am',
    genre: 'Synthwave',
    stems: [
      { id: 's1', name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sine' },
      { id: 's2', name: 'Bass', color: '#f97316', frequency: 110, waveform: 'sine' },
      { id: 's3', name: 'Synth Pad', color: '#22c55e', frequency: 220, waveform: 'sine' },
      { id: 's4', name: 'Arpeggio', color: '#3b82f6', frequency: 261.63, waveform: 'triangle' },
      { id: 's5', name: 'Lead', color: '#a855f7', frequency: 329.63, waveform: 'sawtooth' },
    ],
  },
  {
    id: '2',
    title: 'Midnight Blues',
    artist: 'Delta Rhythm',
    artwork: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    price: 19.99,
    description: 'Soulful blues with a modern twist. Rich guitar layers and velvet vocals.',
    bpm: 90,
    key: 'E7',
    genre: 'Blues',
    stems: [
      { id: 's6', name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sine' },
      { id: 's7', name: 'Bass', color: '#f97316', frequency: 82.41, waveform: 'sine' },
      { id: 's8', name: 'Rhythm Guitar', color: '#22c55e', frequency: 164.81, waveform: 'triangle' },
      { id: 's9', name: 'Lead Guitar', color: '#14b8a6', frequency: 207.65, waveform: 'sawtooth' },
      { id: 's10', name: 'Vocals', color: '#a855f7', frequency: 246.94, waveform: 'sine' },
      { id: 's11', name: 'Piano', color: '#3b82f6', frequency: 293.66, waveform: 'triangle' },
    ],
  },
  {
    id: '3',
    title: 'Digital Rain',
    artist: 'CyberPulse',
    artwork: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=400&fit=crop',
    price: 12.99,
    description: 'Dark cyberpunk industrial techno. Heavy bass and glitched textures.',
    bpm: 140,
    key: 'Dm',
    genre: 'Techno',
    stems: [
      { id: 's12', name: 'Kick', color: '#ef4444', frequency: 55, waveform: 'sine' },
      { id: 's13', name: 'Bass', color: '#f97316', frequency: 73.42, waveform: 'sine' },
      { id: 's14', name: 'Synth', color: '#22c55e', frequency: 146.83, waveform: 'sawtooth' },
      { id: 's15', name: 'Percussion', color: '#3b82f6', frequency: 174.61, waveform: 'triangle' },
      { id: 's16', name: 'FX', color: '#a855f7', frequency: 220, waveform: 'sawtooth' },
    ],
  },
  {
    id: '4',
    title: 'Sunset Groove',
    artist: 'Funk Collective',
    artwork: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    price: 16.99,
    description: 'Funky disco grooves with tight horns and a slapping bassline.',
    bpm: 110,
    key: 'Gm',
    genre: 'Funk',
    stems: [
      { id: 's17', name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sine' },
      { id: 's18', name: 'Bass', color: '#f97316', frequency: 98, waveform: 'sine' },
      { id: 's19', name: 'Guitar', color: '#22c55e', frequency: 196, waveform: 'triangle' },
      { id: 's20', name: 'Keys', color: '#3b82f6', frequency: 233.08, waveform: 'triangle' },
      { id: 's21', name: 'Horns', color: '#a855f7', frequency: 293.66, waveform: 'sawtooth' },
      { id: 's22', name: 'Vocals', color: '#ec4899', frequency: 392, waveform: 'sine' },
    ],
  },
  {
    id: '5',
    title: 'Acoustic Morning',
    artist: 'Willow & Sage',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    price: 9.99,
    description: 'Gentle acoustic folk with intimate vocals and fingerpicked guitar.',
    bpm: 75,
    key: 'C',
    genre: 'Folk',
    stems: [
      { id: 's23', name: 'Bass', color: '#f97316', frequency: 65.41, waveform: 'sine' },
      { id: 's24', name: 'Acoustic Guitar', color: '#22c55e', frequency: 130.81, waveform: 'triangle' },
      { id: 's25', name: 'Percussion', color: '#ef4444', frequency: 164.81, waveform: 'triangle' },
      { id: 's26', name: 'Vocals', color: '#a855f7', frequency: 196, waveform: 'sine' },
      { id: 's27', name: 'Strings', color: '#3b82f6', frequency: 261.63, waveform: 'sine' },
    ],
  },
  {
    id: '6',
    title: 'Urban Flow',
    artist: 'MC Drift',
    artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    price: 24.99,
    description: 'Hard-hitting hip-hop with boom bap drums and smooth samples.',
    bpm: 95,
    key: 'D',
    genre: 'Hip-Hop',
    stems: [
      { id: 's28', name: 'Drums', color: '#ef4444', frequency: 55, waveform: 'sine' },
      { id: 's29', name: '808 Bass', color: '#f97316', frequency: 73.42, waveform: 'sine' },
      { id: 's30', name: 'Keys', color: '#3b82f6', frequency: 146.83, waveform: 'triangle' },
      { id: 's31', name: 'Sample', color: '#22c55e', frequency: 185, waveform: 'triangle' },
      { id: 's32', name: 'Vocals', color: '#a855f7', frequency: 220, waveform: 'sawtooth' },
    ],
  },
  {
    id: '7',
    title: 'Cosmic Drift',
    artist: 'Ambient Waves',
    artwork: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400&h=400&fit=crop',
    price: 11.99,
    description: 'Ethereal ambient soundscapes for deep focus and meditation.',
    bpm: 60,
    key: 'F',
    genre: 'Ambient',
    stems: [
      { id: 's33', name: 'Bass Drone', color: '#f97316', frequency: 87.31, waveform: 'sine' },
      { id: 's34', name: 'Pad', color: '#22c55e', frequency: 174.61, waveform: 'sine' },
      { id: 's35', name: 'Texture', color: '#3b82f6', frequency: 220, waveform: 'sine' },
      { id: 's36', name: 'Melody', color: '#a855f7', frequency: 261.63, waveform: 'triangle' },
    ],
  },
]

export const useStemsStore = () => {
  const tracks = useState<Track[]>('stems:tracks', () => [])
  const loaded = useState<boolean>('stems:loaded', () => false)
  const usingApi = useState<boolean>('stems:usingApi', () => true)

  function normalize(t: Track): Track {
    return { ...t, price: Number(t.price) }
  }

  async function loadTracks() {
    if (loaded.value) return
    try {
      const data = await $fetch<Track[]>('/api/tracks')
      tracks.value = data.map(normalize)
      usingApi.value = true
    } catch {
      tracks.value = mockTracks
      usingApi.value = false
    }
    loaded.value = true
  }

  async function getTrackById(id: string): Promise<Track | undefined> {
    if (usingApi.value) {
      try {
        const data = await $fetch<Track>(`/api/tracks/${id}`)
        return normalize(data)
      } catch {
        // fall through to local
      }
    }
    return tracks.value.find((t) => t.id === id)
  }

  async function addTrack(track: { title: string; artist: string; artwork?: string; price: number; description?: string; bpm?: number; key?: string; genre?: string; stems: Omit<StemDef, 'id'>[] }) {
    if (usingApi.value) {
      try {
        const created = await $fetch<Track>('/api/tracks', {
          method: 'POST',
          body: track,
        })
        tracks.value = [...tracks.value, created]
        return created
      } catch {
        // fall through to local
      }
    }
    const local: Track = {
      ...track,
      id: `local-${crypto.randomUUID()}`,
      stems: track.stems.map((s, i) => ({ ...s, id: `ls-${i}-${Date.now()}` })),
      artwork: track.artwork || 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
      description: track.description || '',
      bpm: track.bpm ?? 120,
      key: track.key || 'C',
      genre: track.genre || '',
    }
    tracks.value = [...tracks.value, local]
    return local
  }

  return {
    tracks,
    loaded,
    usingApi,
    loadTracks,
    getTrackById,
    addTrack,
  }
}
