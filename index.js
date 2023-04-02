// node server which will handle socket io connections
const io= require('socket.io')(8000)
const users={};
// jaise hi connection aye ek arrow function ko add kar do
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        // console.log("New user",name);
        users[socket.id]=name;
        // ye batata hai ek tarike se tum join kiye to sabko pta chal jayega 
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })

    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];

        });
     
 })
