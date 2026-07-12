import 'dotenv/config'
import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL

export let redis: Redis | null = null

if (redisUrl) {
  redis = new Redis(redisUrl, {
    retryStrategy: (times) => {
      const delay = Math.min(times * 100, 5000)
      console.log(`Retrying Redis connection in ${delay}ms...`)
      return delay
    },
  })

  redis.on('connect', () => {
    console.log('✅ Redis client connected successfully!')
  })

  redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message)
  })
} else {
  // ✅ Keeps your terminal perfectly quiet and clean when running locally without Docker
  console.log('⚠️ Redis configuration missing (REDIS_URL). Caching layer bypassed.')
}