import Socket from "./Socket";

class SocketPeer extends Socket{
    constructor(options) {
        super(options);

        this.peer = options.peer;

        this.addEventListener('message', async event => {
            const message = JSON.parse(event.data);
            if (message.url == 'signaling') {
                if (message.body.event == 'sdp') {
                    if (message.body.sdp.type == 'offer') {
                        const answer = await this.peer.createAnswer(message.body.uid, message.body.sdp);
        
                        this.send(JSON.stringify({
                            url: 'signaling',
                            body: {
                                event: 'sdp',
                                uid: message.body.uid,
                                sdp: answer
                            }
                        }))
                    } else if (message.body.sdp.type == 'answer') {
                        await this.peer.setAnswer(message.body.uid, message.body.sdp);
                    }
                }
            }
        })
    }

    async open(uid) {
        const offer = await this.peer.createOffer(uid);
        this.send(JSON.stringify({
            url: 'signaling',
            body: {
                event: 'sdp',
                uid: uid,
                sdp: offer
            }
        }));
    }
}

export default SocketPeer;
