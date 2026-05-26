# stems.me

A platform where artists host music stems, fans mix them in the browser with a Web Audio API mixer, and stems are sold as products.

Built with **Nuxt 4**, **Vue 3**, **PostgreSQL + Drizzle ORM**, and **Stripe**.

## Features

- **Browse stems** — explore multitrack stem packs with artwork, BPM, key, and genre
- **Web audio mixer** — DAW-style UI with volume faders, solo, mute, and master volume for each stem
- **Upload stems** — create stem packs with real `.mp3`/`.wav` files or oscillator-based stems
- **Stripe checkout** — purchase stem packs via Stripe's hosted payment page
- **Demo fallback** — site works without a database using built-in mock data

## Prerequisites

- **Node.js** 18+
- **pnpm** (`npm install -g pnpm`)
- **PostgreSQL** 16+ running locally
  - macOS: `brew install postgresql@18 && brew services start postgresql@18`
- **Stripe account** (optional, for purchases)
  - Create a test account at https://dashboard.stripe.com/test/apikeys

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USER/stems.me.git
cd stems.me

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL user and Stripe key

# 4. Create the database
createdb stemsme

# 5. Push schema and seed demo data
pnpm db:seed

# 6. Start dev server
pnpm dev
```

Visit **http://localhost:3000**.

### Quick start without a database

The site falls back to 7 built-in demo tracks with 36 oscillator-based stems. Just run `pnpm dev` and browse — no database needed. Uploading and purchasing require the database.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (HMR) |
| `pnpm build` | Production build (Vercel preset) |
| `pnpm preview` | Preview production build |
| `pnpm db:generate` | Generate Drizzle migration |
| `pnpm db:seed` | Seed demo tracks + stems |
| `pnpm db:studio` | Open Drizzle Studio (GUI DB browser) |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com/) + [Vue 3](https://vuejs.org/) |
| Router | [Vue Router 5](https://router.vuejs.org/) |
| Database | PostgreSQL 18 via [Drizzle ORM](https://orm.drizzle.team/) |
| Driver | [postgres.js](https://github.com/porsager/postgres) |
| Audio | Web Audio API (`AudioContext`, `OscillatorNode`, `AudioBufferSourceNode`) |
| Payments | [Stripe Checkout](https://stripe.com/payments/checkout) |
| Deploy | [Vercel](https://vercel.com/) (Nitro preset) |

## Architecture

```
stems.me/
├── app/                        Nuxt frontend (Vue 3)
│   ├── composables/
│   │   ├── useStemsStore.ts    State management + mock data + API fallback
│   │   └── useAudioEngine.ts   Web Audio API mixer engine
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── TrackCard.vue
│   │   └── MixerChannel.vue    Channel strip (fader, solo, mute)
│   └── pages/
│       ├── index.vue           Landing page
│       ├── browse.vue          Browse all stem packs
│       ├── upload.vue          Upload form with file inputs
│       ├── track/[id].vue      Track detail / product page
│       └── mix/[id].vue        Web audio mixer page
├── server/                     Nitro API layer
│   ├── api/
│   │   ├── tracks/
│   │   │   ├── index.get.ts    GET /api/tracks
│   │   │   ├── index.post.ts   POST /api/tracks
│   │   │   └── [id].get.ts     GET /api/tracks/:id
│   │   └── stripe-checkout.post.ts  POST /api/stripe-checkout
│   │   └── upload.post.ts      POST /api/upload (file upload)
│   └── db/
│       ├── schema.ts           Drizzle table definitions
│       ├── relations.ts        Drizzle relations
│       ├── index.ts            DB connection
│       └── seed.ts             Demo data seeder
├── public/uploads/             Uploaded audio files (dev)
├── scripts/setup-db.ts         One-shot DB setup
└── .env.example                Environment template
```

## Database Schema

### `tracks`

| Column | Type | Notes |
|---|---|---|
| id | `uuid` | Auto-generated |
| title | `varchar(255)` | Required |
| artist | `varchar(255)` | Required |
| artwork | `text` | Image URL |
| price | `decimal(10,2)` | USD |
| description | `text` | |
| bpm | `integer` | |
| key | `varchar(10)` | e.g. Am, C, F#m |
| genre | `varchar(100)` | |
| created_at | `timestamp` | |

### `stems`

| Column | Type | Notes |
|---|---|---|
| id | `uuid` | Auto-generated |
| track_id | `uuid` | FK → tracks.id (cascade delete) |
| name | `varchar(255)` | e.g. Drums, Bass |
| color | `varchar(7)` | Hex color |
| frequency | `real` | Hz (oscillator fallback) |
| waveform | `varchar(20)` | sine, sawtooth, triangle, square |
| file_url | `text` | Uploaded audio file path |
| sort_order | `integer` | Stem ordering |
| created_at | `timestamp` | |

Stems with a `file_url` play back real audio files. Stems without `file_url` fall back to oscillator synthesis using `frequency` and `waveform`.

## Audio Engine

The mixer (`useAudioEngine.ts`) supports two playback modes:

1. **Audio file stems** — fetches the file, decodes it via `AudioContext.decodeAudioData()`, and plays it through an `AudioBufferSourceNode` with looping enabled
2. **Oscillator stems** — creates an `OscillatorNode` with the configured waveform and frequency

Both share the same gain staging pipeline: per-stem volume → solo/mute logic → master volume → destination.

## Deployment

The project includes a Vercel Nitro preset:

```bash
pnpm build
npx vercel deploy --prebuilt
```

**File uploads**: The dev server stores files under `public/uploads/`. On Vercel, you'll need to swap to a blob storage solution like [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) or S3 — replace the `writeFile` call in `server/api/upload.post.ts`.

**Stripe**: Set `STRIPE_SECRET_KEY` in your Vercel environment variables.

## License

MIT
