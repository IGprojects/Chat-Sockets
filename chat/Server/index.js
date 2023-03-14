var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola_mundo', function (req, res) {
    res.status(200).send('HOLA MUNDO');
});

var messages = [{
    id: 1,
    message: 'Bienvenido al chat de IGProjects',
    nickname: 'Bot IGProjects',
}];


//EVENT SOCKET DE QUAN ALGU ES CONECTA
io.on('connection', (socket) => {
    console.log('Se ha conectado el cliente con la IP -> ' + socket.handshake.address);

    //ENVIAR
    socket.emit('messages', messages); //AQUI LI PASSES AL SOCKET QUE S HA CREAT A PARTIR DEL CLIENT QUE S HA CONECTAT EL MISSATGE DENTRADA

    //REBRE
    socket.on('add-message', (dataRebuda) => {
        messages.push(dataRebuda);

        //ENVIEM A TOTS ELS CLIENTS CONECTATS ELS MISSATGES
        io.sockets.emit('messages', messages);
    });
});


server.listen(8310, function () {
    console.log("listening in port localhost:8310");
});