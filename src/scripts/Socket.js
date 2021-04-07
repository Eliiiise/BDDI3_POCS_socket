import { io } from 'socket.io-client'

export default class Socket {
    constructor() {
        this.initEls()
        this.initEvents()
    }

    initEls() {
        this.$els = {
            messages: document.getElementById('messages'),
            form: document.getElementById('form'),
            input: document.getElementById('input')
        };
        this.socket = io()
    }

    initEvents() {
        this.$els.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.$els.input.value) {
                this.socket.emit('chat message', this.$els.input.value);
                this.$els.input.value = '';
            }
        });

        this.socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            this.$els.messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}
