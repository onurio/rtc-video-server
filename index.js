// const app = require('express')();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const PORT = process.env.PORT || 4000;
// const SocketManager = require('./SocketManager');



// server.listen(PORT,()=>console.log('listetning on: '+PORT));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', SocketManager);






var app = require('http').createServer();
var io = module.exports.io = require('socket.io')(app);

const PORT = process.env.PORT || 4000;
const SocketManager = require('./SocketManager.js');
console.log(PORT);
io.on('connection',SocketManager);

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});