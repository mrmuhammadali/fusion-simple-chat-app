export default {
  chat: (data, socket) => {
    socket.nsp.emit('message', { sentBy: socket.id, data })
  },
}
