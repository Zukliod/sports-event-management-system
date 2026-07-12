import { Request } from 'express'

export enum EventRole {
  SUPER_ADMIN = 1,
  EVENT_ADMIN = 2,
  SPORT_COORDINATOR = 3,
  PARTICIPANT = 4,
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
      }
      currentEventRole?: EventRole
    }
  }
}
