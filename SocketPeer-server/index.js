const SocketServer = require('./src/SocketServer');
const SignalingSocketServer = require('./src/SignalingSocketServer');

const ss = new SocketServer({
    url: '127.0.0.1',
    port: 8000
});

const sss = new SignalingSocketServer({
    socket: ss
});