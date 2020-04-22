const io = require('./index.js').io;


let idName = {}
let connectedUsers = {};

module.exports = (socket) =>{
    connectedUsers[socket.id] = socket;


    socket.on('newRoom',(info)=>{
        idName[info.name] = socket.id;
        socket.join(info.id);
        socket.name = info.name;
        // console.log(socket.name+' connected to room '+info.id);
        
    });

    socket.on('getNames',()=>{
        socket.to(Object.keys(socket.rooms)[1]).emit('names',Object.keys(idName));
    })

    socket.on('joinRoom',(info)=>{
        idName[info.name] = socket.id;
        socket.to(info.id).emit('friendJoined',{name: info.name,id: socket.id});
        socket.join(info.id);
        socket.name= info.name;
        console.log(info.name+'sent first ping');
        // console.log(socket.name+' joined room '+info.id);
    })

    socket.on('rtc_id',(msg)=>{
        console.log(socket.name+'sent second ping');
        connectedUsers[msg.socketId].emit('friendJoinedReturn',{name:socket.name,rtcId:msg.rtcId,socketId:socket.id});
    });

    socket.on('rtc_id_return',(msg)=>{
        console.log(socket.name+'send third ping');
        connectedUsers[msg.socketId].emit('friendJoinedReturnFinish',{name:socket.name,rtcId:msg.rtcId});
    });


    
    
    socket.on('disconnect',()=>{
        console.log(socket.name+' disconnected');
        delete idName[socket.name];
    });
}