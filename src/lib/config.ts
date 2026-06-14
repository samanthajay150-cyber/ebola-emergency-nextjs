// Environment variables
import 'dotenv/config'

export default {
  DATABASE_URL: process.env.DATABASE_URL!,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'ebola2026admin',
}
