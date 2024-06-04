const SignalingSocketServer = require('./src/SignalingSocketServer');

const sss = new SignalingSocketServer({
    url: '127.0.0.1',
    port: 8000
});