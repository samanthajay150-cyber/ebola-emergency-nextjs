// Database connection
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_bepP0kniUfc1@ep-steep-tree-aiuw9mx0-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'
export const sql = postgres(connectionString)

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        application_id TEXT UNIQUE NOT NULL,
        ready_to_proceed BOOLEAN NOT NULL,
        first_time_applicant BOOLEAN NOT NULL,
        heard_about_funds TEXT NOT NULL,
        other_source TEXT,
        occupation TEXT NOT NULL,
        other_occupation TEXT,
        full_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT,
        phone_number TEXT,
        country TEXT NOT NULL,
        state TEXT NOT NULL,
        town TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        reviewed_at TEXT,
        reviewed_by TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `
    
    await sql`CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at)`
    
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization error:', error)
  }
}

// Application types
export interface Application {
  id: number
  application_id: string
  ready_to_proceed: boolean
  first_time_applicant: boolean
  heard_about_funds: string
  other_source?: string
  occupation: string
  other_occupation?: string
  full_name: string
  age: number
  email?: string
  phone_number?: string
  country: string
  state: string
  town: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected'
  notes?: string
  reviewed_at?: string
  reviewed_by?: string
  created_at: string
}

export interface ApplicationInput {
  readyToProceed: boolean
  firstTimeApplicant: boolean
  heardAboutFunds: string
  otherSource?: string
  occupation: string
  otherOccupation?: string
  fullName: string
  age: number
  email?: string
  phoneNumber?: string
  country: string
  state: string
  town: string
}
