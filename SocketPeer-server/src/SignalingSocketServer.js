const SocketServer = require("./SocketServer");

class SignalingSocketServer extends SocketServer{
    constructor (options) {
        super(options);

        this.on('connection', ws => {
            ws.on('message', data => {
                const message = JSON.parse(data);
                if (message.url == 'signaling') {
                    if (message.body.event == 'sdp') {
                        if (this.sockets[message.body.uid]) {
                            this.sockets[message.body.uid].send(JSON.stringify({
                                url: 'signaling',
                                body: {
                                    event: 'sdp',
                                    uid: ws.id,
                                    sdp: message.body.sdp
                                }
                            }));
                        }
                    }
                }
            });
        });
    }
}

module.exports = SignalingSocketServer;