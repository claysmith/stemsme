import { eq } from 'drizzle-orm'
import { db } from '../db'
import { tracks } from '../db/schema'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw createError({
      statusCode: 500,
      message: 'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.',
    })
  }

  const stripe = new Stripe(key)
  const body = await readBody<{ trackId: string; title?: string; price?: number }>(event)

  if (!body.trackId) {
    throw createError({ statusCode: 400, message: 'trackId is required' })
  }

  let trackTitle: string
  let trackPrice: number

  const result = await db.query.tracks.findFirst({
    where: eq(tracks.id, body.trackId),
  })

  if (result) {
    trackTitle = result.title
    trackPrice = Number(result.price)
  } else if (body.title && body.price) {
    trackTitle = body.title
    trackPrice = body.price
  } else {
    throw createError({ statusCode: 404, message: 'Track not found' })
  }

  const product = await stripe.products.create({
    name: trackTitle,
    metadata: { track_id: body.trackId },
  })

  const price = await stripe.prices.create({
    product: product.id,
    currency: 'usd',
    unit_amount: Math.round(trackPrice * 100),
  })

  const origin = getHeader(event, 'origin') || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: price.id, quantity: 1 }],
    success_url: `${origin}/track/${body.trackId}?purchased=true`,
    cancel_url: `${origin}/track/${body.trackId}`,
  })

  return { url: session.url }
})
