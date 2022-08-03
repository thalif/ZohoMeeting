const express = require('express');
const socket = require('socket.io');

const port = 5502;
const app = express();
var server = app.listen(port, () => {
    console.log(`App is listening to server on port ${port}`);
});

app.use(express.static('./'));

//============
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Yes! Connected id ', socket.id);

    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
    
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});