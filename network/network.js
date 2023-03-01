import { FXMLhttpRequest } from './fxmlhttprequest.js';
import { server } from './server/server.js' 
export class network {
    
    /**
     * chech if the request is to our server
     * if so, send the reuest to the server.
     * @param {FXMLhttpRequest} FXMLhttpRequest the request to the server
     * @returns undefined if this is a bad request
     */
    static send(FXMLhttpRequest) {
        console.log('network: ',FXMLhttpRequest.method, FXMLhttpRequest.url);
        if (FXMLhttpRequest.url.length < 0) {
            console.log('network: invalid url');
            return;
        }
        if(FXMLhttpRequest.url.split('/')[0] === 'server.com'){
            server.handle(FXMLhttpRequest, function (response){
                console.log('network: responding to client with ', response)
                FXMLhttpRequest.onready_handler(response);
            })
        }
    }

    


}