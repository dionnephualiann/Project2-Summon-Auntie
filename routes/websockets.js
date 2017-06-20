
module.exports = (io) => {

  let connectedUser =[];

  io.on('connection', (socket) => {

    console.log('New user connected');
    //connectedUser[socket.request.user._id]= socket.request.user;

    socket.on('newMessage', (data) => {
      console.log('New message',data);
      io.emit('broadcast message', data);
    });


    socket.on('newUser', (data) => {
      console.log('New User',data);
      io.emit('broadcast location', data);
    });

    socket.on('newMarker', (data) => {
      console.log('New Marker',data);
      io.emit('broadcast marker', data);
    });



  });



}
