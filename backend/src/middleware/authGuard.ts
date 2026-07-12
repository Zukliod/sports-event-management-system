import { Request, Response, NextFunction } from 'express'
import { prisma } from '../config/db.js'
import { EventRole } from '../types/auth.js'

// Map Prisma EventRole enum (string) to our numeric EventRole
const prismaEventRoleToEventRole: Record<string, EventRole> = {
  SUPER_ADMIN: EventRole.SUPER_ADMIN,
  EVENT_ADMIN: EventRole.EVENT_ADMIN,
  SPORT_COORDINATOR: EventRole.SPORT_COORDINATOR,
  PARTICIPANT: EventRole.PARTICIPANT,
}

export const verifyEventRole = (allowedRoles: EventRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eventIdHeader = req.headers['x-event-id']
      if (!eventIdHeader) {
        return res.status(400).json({ message: 'x-event-id header is required' })
      }
      const eventId = Number(eventIdHeader)
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized: No user context' })
      }

      const roleAssignment = await prisma.roleAssignment.findUnique({
        where: {
          userId_eventId: {
            userId: req.user.id,
            eventId: eventId,
          },
        },
      })

      if (!roleAssignment) {
        return res
          .status(403)
          .json({ message: 'Forbidden: No role assigned for this event' })
      }

      const userRole = prismaEventRoleToEventRole[roleAssignment.role]
      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient role permissions' })
      }

      req.currentEventRole = userRole
      next()
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Internal server error during role verification', error })
    }
  }
}
