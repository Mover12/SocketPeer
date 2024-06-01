const WebSocket = require('ws');
const WSSignalingServer = require('./src/signalsocket');

const ss = new WSSignalingServer({
    wss: new WebSocket.Server({
        url: '127.0.0.1',
        port: 8000
    })
});