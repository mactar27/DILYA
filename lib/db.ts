import { PrismaClient } from './generated/prisma/client'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

// Retry fetch with a 30s timeout per attempt to handle TiDB Serverless cold starts
async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  attempts = 3,
): Promise<Response> {
  let lastError: unknown
  for (let i = 0; i < attempts; i++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 30_000)
    try {
      const res = await fetch(input, { ...init, signal: controller.signal })
      clearTimeout(timer)
      return res
    } catch (err) {
      clearTimeout(timer)
      lastError = err
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
      }
    }
  }
  throw lastError
}

// Use environment variable for TiDB Cloud connection
const TIDB_URL = process.env.TIDB_URL!

const adapter = new PrismaTiDBCloud({ 
  url: TIDB_URL, 
  fetch: fetchWithRetry 
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
