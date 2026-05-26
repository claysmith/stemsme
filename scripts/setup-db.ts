import { execSync } from 'node:child_process'

const dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/stemsme'
const dbName = dbUrl.split('/').pop() || 'stemsme'

async function setup() {
  console.log(`\n  Setting up database: ${dbName}\n`)

  // Create database (ignore error if it exists)
  try {
    execSync(`createdb "${dbName}" 2>/dev/null || true`, { stdio: 'inherit' })
  } catch {
    // createdb not found, try via SQL
    try {
      execSync(
        `psql -U postgres -c "CREATE DATABASE "${dbName}";" 2>/dev/null || true`,
        { stdio: 'inherit' },
      )
    } catch {
      console.log('  Could not auto-create database. Please create it manually.')
    }
  }

  // Run drizzle migrations
  console.log('  Running migrations...')
  execSync('npx drizzle-kit push', { stdio: 'inherit', cwd: process.cwd() })

  // Seed data
  console.log('  Seeding data...')
  execSync('npx tsx server/db/seed.ts', { stdio: 'inherit', cwd: process.cwd() })

  console.log(`\n  ✅ Database ${dbName} is ready!\n`)
}

setup().catch((err) => {
  console.error('Setup failed:', err.message)
  process.exit(1)
})
