export const sockets = (io) => {
  io.on('connection', () => {
    console.log('User connected');
  })
};
