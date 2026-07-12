import express from 'express'
import http from 'http'
import cors from 'cors'
import { initSocket } from './config/socket.js'
import eventRoutes from './routes/eventRoutes.js'
import scoreRoutes from './routes/scoreRoutes.js'

const app = express()
const server = http.createServer(app)
const io = initSocket(server)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({ message: 'SEMS Backend is running!' })
})

app.use('/api/events', eventRoutes)
app.use('/api/scores', scoreRoutes)

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
