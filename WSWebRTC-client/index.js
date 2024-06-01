import WSPeer from "./src/wspeer";
import Peer from "./src/peer";

function getHash(length) {
    return Array.from(Array(length), () => Math.floor(Math.random() * 16).toString(16)).join('');
}

const UID = getHash(8);

const hash = document.querySelector('.hash');
const inputWS = document.querySelector('.input-ws');
const connectBtn = document.querySelector('.connect');
const exampleWS = document.querySelector('.example-ws');
const inputHash = document.querySelector('.input-hash');
const openBtn = document.querySelector('.open');

hash.innerHTML = UID

connectBtn.addEventListener('click', () => {
    const wsp = new WSPeer({
        peer: new Peer(UID),
        wss: new WebSocket(`ws://${inputWS.value}`)
    });

    wsp.wss.onopen = () => {
        wsp.connect(hash.innerHTML)
    }
    
    openBtn.addEventListener('click', () => {
        wsp.open(inputHash.value);
    })
    
    wsp.peer.onopen = (e) => {
        console.log('OPEN')
    }
    
})

exampleWS.addEventListener('click', () => {
    inputWS.value = exampleWS.innerHTML
});
