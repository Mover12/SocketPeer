class WSPeer {
    constructor(options) {
        this.peer = options.peer;
        this.wss = options.wss;

        this.wss.addEventListener('message', async event => {
            const message = JSON.parse(event.data);
            if (message.event == 'offer') {
                const answer = await this.peer.createAnswer(message.data.uid, message.data.sdp);

                this.wss.send(JSON.stringify({
                    event: 'sdp',
                    data: {
                        uid: message.data.uid,
                        sdp: answer
                    }
                }))
            } else if (message.event == 'answer') {
                await this.peer.setAnswer(message.data.uid, message.data.sdp);
            }
        })
    }

    connect(uid) {
        this.wss.send(JSON.stringify({
            event: 'connect',
            data: {
                uid: uid
            }
        }));
    }

    async open(uid) {
        const offer = await this.peer.createOffer(uid);
        this.wss.send(JSON.stringify({
            event: 'sdp',
            data: {
                uid: uid,
                sdp: offer
            }
        }));
    }
}

export default WSPeer;