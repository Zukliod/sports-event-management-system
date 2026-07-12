import { Request, Response } from 'express'
import { prisma } from '../config/db.js'
import { getSocket } from '../config/socket.js'

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title, description, date, venue, maxParticipants } = req.body
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        venue,
        maxParticipants,
      },
    })
    const io = getSocket()
    io.emit('eventCreated', event)
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error })
  }
}

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany()
    res.json(events)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get events', error })
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    })
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get event', error })
  }
}
