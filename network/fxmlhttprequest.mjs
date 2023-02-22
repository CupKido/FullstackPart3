import { network } from './network.mjs';

export class FXMLhttpRequest {

    // create 'open' method
    open(method, url, body, onready_handler) {
        this.method = method;
        this.url = url;
        this.body = body;
        this.onready_handler = onready_handler;
        this.status = 0;
    }

    // create 'send' method
    send() {
        network.send(this);
    }

}