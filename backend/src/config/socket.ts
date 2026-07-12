import { Server as SocketIOServer } from 'socket.io'
import http from 'http'

let io: SocketIOServer | null = null

export const initSocket = (server: http.Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
    },
  })
  return io
}

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized!')
  }
  return io
}
