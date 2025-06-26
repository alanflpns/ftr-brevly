import { envConfig } from '@/env'
import type { Config } from 'drizzle-kit'

export default {
  dbCredentials: {
    url: envConfig.DATABASE_URL,
  },
  dialect: 'postgresql',
  schema: 'src/infra/db/schemas/*',
  out: 'src/infra/db/migrations',
} satisfies Config
