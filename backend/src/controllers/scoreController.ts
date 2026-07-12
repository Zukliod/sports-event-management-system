import { Request, Response } from 'express'
import { redis } from '../config/redis.js'
import type { LiveMatchScore } from '../types/sport.js'

interface UpdateLiveScoreRequest extends Request {
  body: {
    matchId: string | number
    sport: string
    scoreData: LiveMatchScore
  }
}

export async function updateLiveScore(
  req: UpdateLiveScoreRequest,
  res: Response
): Promise<void> {
  try {
    const { matchId, sport, scoreData } = req.body

    // Validate required inputs
    if (!matchId || !sport || !scoreData) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: matchId, sport, and scoreData are required',
      })
      return
    }

    // Save to Redis with 24-hour expiration
    const redisKey = `match:live:${matchId}`
    await redis.set(redisKey, JSON.stringify(scoreData), 'EX', 86400)

    res.status(200).json({
      success: true,
      message: 'Live score updated in cache successfully',
      data: scoreData,
    })
  } catch (error) {
    console.error('Error updating live score:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update live score',
    })
  }
}
