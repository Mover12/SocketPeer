class WSSignalingServer {
    constructor (options) {
        this.wss = options.wss;
        
        this.clients = {};

        this.wss.on('connection', ws => {
            ws.on('message', data => {
                const message = JSON.parse(data);
                if (message.event == 'connect') {
                    ws.uid = message.data.uid
                    this.clients[message.data.uid] = ws; 
                } else if (message.event == 'sdp') {
                    if (this.clients[message.data.uid]) {
                        this.clients[message.data.uid].send(JSON.stringify({
                            event: message.data.sdp.type,
                            data: {
                                uid: ws.uid,
                                sdp: message.data.sdp
                            }
                        }));
                    }
                }
            });
        });

        this.wss.on('close', ws => {
            delete this.clients[ws.uid];
        })
    }
}

module.exports = WSSignalingServer;