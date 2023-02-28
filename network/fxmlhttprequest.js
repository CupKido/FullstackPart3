import { network } from './network.js';

export class FXMLhttpRequest {

    /**
     * method to open request to the server through the network
     * @param {string} method the method whated to do
     * @param {string} url the url to do the method
     * @param {string} body the request body
     * @param {Function} onready_handler the function to actived when to request is finished
     */
    open(method, url, body, onready_handler) {
        this.method = method;
        this.url = url;
        this.body = body;
        this.onready_handler = onready_handler;
        this.status = 0;
    }

    /**
     * send the method to the server through the network
     */
    send() {
        network.send(this);
    }

}