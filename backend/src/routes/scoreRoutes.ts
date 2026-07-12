import { Router } from 'express'
import { updateLiveScore } from '../controllers/scoreController.js'
import { verifyEventRole } from '../middleware/authGuard.js'
import { EventRole } from '../types/auth.js'

const router = Router()

router.put(
  '/live/:eventId/:matchId',
  verifyEventRole([
    EventRole.SUPER_ADMIN,
    EventRole.EVENT_ADMIN,
    EventRole.SPORT_COORDINATOR,
  ]),
  updateLiveScore
)

export default router
