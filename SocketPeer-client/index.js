import Socket from './src/Socket'
import Peer from './src/Peer'
import SocketPeer from './src/SocketPeer'

const UID = Array.from(Array(8), () => Math.floor(Math.random() * 16).toString(16)).join('');

const text_user_id = document.querySelector('.text-user-id');
const input_user_id = document.querySelector('.input-user-id');
const open = document.querySelector('.open');

text_user_id.innerHTML = UID

const socket = new Socket({
    id: UID,
    url: 'ws://127.0.0.1:8000'
});

const peer = new Peer({
    id: UID
});


const socketpeer = new SocketPeer({
    socket: socket,
    peer: peer
});

open.addEventListener('click', () => {
    socketpeer.open(input_user_id.value);
})

peer.onopen = (e) => {
    console.log('OPEN')
}