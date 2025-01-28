export default defineWebSocketHandler({
  async message(peer, message) {
    peer.peers.forEach((peer) => {
      peer.send(JSON.stringify(message.json()));
    });
  },
});
