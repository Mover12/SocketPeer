import Peer from './src/Peer'
import SocketPeer from './src/SocketPeer'

const UID = Array.from(Array(8), () => Math.floor(Math.random() * 16).toString(16)).join('');

const text_user_id = document.querySelector('.text-user-id');
const input_user_id = document.querySelector('.input-user-id');
const open = document.querySelector('.open');

text_user_id.innerHTML = UID

const sp = new SocketPeer({
    id: UID,
    url: 'ws://127.0.0.1:8000',
    peer: new Peer(UID)
});

open.addEventListener('click', () => {
    sp.open(input_user_id.value);
})

sp.peer.onopen = (e) => {
    console.log('OPEN')
}