import { writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'

const ALLOWED = ['.mp3', '.wav']
const MAX_SIZE = 50 * 1024 * 1024

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = files[0]
  if (!file.filename) {
    throw createError({ statusCode: 400, message: 'No file selected' })
  }

  const ext = path.extname(file.filename).toLowerCase()
  if (!ALLOWED.includes(ext)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid file type. Only .mp3 and .wav are allowed.',
    })
  }

  if ((file.data?.length ?? 0) > MAX_SIZE) {
    throw createError({
      statusCode: 400,
      message: 'File too large. Maximum size is 50MB.',
    })
  }

  const uploadDir = path.resolve('./public/uploads')
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
  }

  const uniqueName = `${randomUUID()}${ext}`
  await writeFile(path.join(uploadDir, uniqueName), file.data)

  return { url: `/uploads/${uniqueName}` }
})
