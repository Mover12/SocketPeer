import Socket from '../src/Socket'
import Peer from '../src/Peer'
import SocketPeer from '../src/SocketPeer'

const UID = Array.from(Array(8), () => Math.floor(Math.random() * 16).toString(16)).join('');

const text_user_id = document.querySelector('.text-user-id');
const input_user_id = document.querySelector('.input-user-id');
const open = document.querySelector('.open');
const chats = document.querySelector('.chats');

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
});

peer.onopen = (e) => {
    const [id, event] = e.detail;

    const chat = document.createElement('div');
    chat.className = `id-${id}`;

    const text_user_id = document.createElement('div');
    text_user_id.className = 'text-user-id';
    text_user_id.innerHTML = id;

    const input_message = document.createElement('input');
    input_message.className = 'input-message';

    input_message.addEventListener('input', () => {
        peer.send(id, {
            event: 'input',
            id: peer.id,
            text: input_message.value
        })
    });

    const close = document.createElement('button');
    close.className = 'close';
    close.innerHTML = 'close';

    close.addEventListener('click', () => {
        peer.close(id);
    });

    peer.onclose = () => {
        chats.removeChild(chat);
    }

    chat.appendChild(text_user_id);
    chat.appendChild(input_message);
    chat.appendChild(close);

    chats.appendChild(chat);
}

peer.onmessage = (e) => {
    const [id, event] = e.detail;
    const message = JSON.parse(event.data);
    if (message.event == 'input') {
        chats.querySelector(`.id-${message.id}`).querySelector('.input-message').value = message.text
    }
}