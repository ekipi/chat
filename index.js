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
    let client_id = socket.id
    console.log(`${client_id} connected`);
    // once a client has connected, get the room id from client
    let room = ''
    socket.on('room', (room_id) => {
        socket.join(room_id);
        room = room_id; //store the room id so that messages could be broadcasted to that perticular room
    });
    //When client emits the chat event, capture the chat message and broadcast it to the room
    socket.on('chat', (message) => {
        io.sockets.in(room).emit('chat', client_id, message);
    })
    //Upon disconnection, display a message in the log
    socket.on('disconnect', () => {
        console.log(`${client_id} disconnected`);
    });
});

http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})