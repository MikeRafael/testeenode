const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) =>{
    res.sendFile('./html/index.html',  { root: __dirname })
});

io.on('connection', (socket) =>{
    console.log(`Usuário Conectado`)
    socket.on('chatt', (msg)=>{
        console.log(msg);
        io.emit('chatt', msg);
    });
});

server.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`)
})