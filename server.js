const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
    // ff49d0b9-eb40-41e0-9394-99c5cdccc72d
    // 9d38bdb1-011d-4d77-8ab2-e671de4d1f9b
  })
  
  app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
  })
  io.on('connection', socket => {
      console.log("connection")
    socket.on('join-room', (roomId, userId) => {
        console.log("roomId", roomId )
        console.log("userId",userId)
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', userId)
    
      socket.on('disconnect', () => {
        socket.to(roomId).emit('user-disconnected', userId)
      })
      
    })

})


server.listen(3000)
