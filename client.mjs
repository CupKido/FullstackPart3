import { FXMLhttpRequest } from "./network/fxmlhttprequest.mjs";

function main(){
    var req = new FXMLhttpRequest();
    req.open(
     'PUT',
     'server.com/CreateTask',
     {title: 'Make third fullstack project', description : 'Annoy Avishay to death'},
     function(response) {
        console.log('client from server.com says: ', response);
    });
    req.send();
}

main();