const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http);
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (message) => {
        io.emit('chat message', message)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})