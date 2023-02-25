//import { FXMLhttpRequest } from "./fxmlhttprequest.mjs";
console.log('importing');
import { Database } from "./DataBase/database.js";
import { Mission } from "./DataBase/mission.js";
import { User } from "./DataBase/user.js";
console.log('imported');
export class server{
    static my_url = 'server.com';
    static handle(FXMLhttpRequest) {
        
        console.log(server.my_url + ' received ', FXMLhttpRequest.body, ' with method ', FXMLhttpRequest.method);
        var resource = FXMLhttpRequest.url.substring(server.my_url.length, FXMLhttpRequest.url.length)
        if (FXMLhttpRequest.method === 'GET') {
            this.handle_GET(resource, FXMLhttpRequest.body, FXMLhttpRequest.onready_handler);
        }
        else if (FXMLhttpRequest.method === 'POST') {   
            this.handle_POST(resource, FXMLhttpRequest.body, FXMLhttpRequest.onready_handler);
        }
        else if (FXMLhttpRequest.method === 'PUT') {
            this.handle_PUT(resource, FXMLhttpRequest.body, FXMLhttpRequest.onready_handler);
        }
        else if (FXMLhttpRequest.method === 'DELETE') {
            this.handle_DELETE(resource, FXMLhttpRequest.body, FXMLhttpRequest.onready_handler);
        }
        FXMLhttpRequest.status = 4;
    }

    static handle_GET(resource, body, on_ready_callback){
        var options = []

        
        options.push(["/SignIn", function (resource, body, on_ready_callback){
            // do this and that
            // get user 
            var user = Database.getUser(body.username, body.password)
            // if user exists
            if (user !== undefined) {
                console.log('user exists')
                var response = {status: 200,
                    user: {username : user.username,
                         password : user.password,
                          id : user.id,
                           fname : user.fname,
                            lname : user.lname}}
               on_ready_callback(response);
            }
            else {
                console.log('user does not exist')
                var response = {status: 404,
                    user: undefined}
                on_ready_callback(response);
            }
            // call on_ready_callback when done
            
        }]);

        
        

        options.push(["/GetTasks", function (resource, body, on_ready_callback){
            // do this and that
            // get user 
            
            // if user exists
            
            var response = {status: 200, userId : body.userId,
                tasks : [{title : 'do this'}, {title : 'do that'}, {title : 'do those'}] }
            on_ready_callback(response);
            
            // call on_ready_callback when done
            
        }]);

        for (var i = 0; i < options.length; i++) {
            console.log(options[i][0], ' === ', resource);
            if(resource === options[i][0]){
                options[i][1](resource, body, on_ready_callback);
                break;
            }
        }
    }

    static handle_POST(resource, body, on_ready_callback){
        var options = []
        
        


        for (var i = 0; i < options.length; i++) {
            if(resource === options[i][0]){
                options[i][1](resource, body, on_ready_callback);
                break;
            }
        }
    }

    static handle_PUT(resource, body, on_ready_callback){
        var options = []
        options.push(["/CreateTask", function (resource, body, on_ready_callback){
            // do this and that

            // call on_ready_callback when done

            on_ready_callback({status: 200, response: 'server.com says: task ' + body.title + ' created'});
        }]);

        options.push(["/SignUp", function (resource, body, on_ready_callback){
            // do this and that
            // get user 
            var user = Database.getUser(body.username, body.password)
            var response = {}
            // if user exists
            if (user !== undefined) {
                console.log('user already exists')
                response = {status: 404,
                    user: undefined}
            }
            else {
                console.log('user does not exist, signing up')
                var user = new User(body.username, body.password, body.fname, body.lname);
                Database.addUser(user);
                var user = Database.getUser(body.username, body.password)
                console.log(user)
                response = {status: 200,
                    user: {username : user.username,
                        password : user.password,
                         id : user.id,
                          fname : user.fname,
                           lname : user.lname}}
            }
            // call on_ready_callback when done
            on_ready_callback(response);
        }]);
        
        for (var i = 0; i < options.length; i++) {
            if(resource === options[i][0]){
                options[i][1](resource, body, on_ready_callback);
                break;
            }
        }
    }    

    static handle_DELETE(resource, body, on_ready_callback){
        var options = []
        
        for (var i = 0; i < options.length; i++) {
            if(resource === options[i][0]){
                options[i][1](resource, body, on_ready_callback);
                break;
            }
        }
    }
}