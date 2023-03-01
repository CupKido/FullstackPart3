import { FXMLhttpRequest } from "../fxmlhttprequest.js";
import { Database } from "./DataBase/database.js";
import { Mission } from "./DataBase/mission.js";
import { User } from "./DataBase/user.js";
export class server{
    /**
     * class that represent server working
     */
    static my_url = 'server.com';
    /**
     * this function is handeling calls that arrived to the server from the network
     * @param {FXMLhttpRequest} FXMLhttpRequest the request to the server
     */
    static handle(FXMLhttpRequest, respond_method) {
        

        console.log(server.my_url + ' received ', FXMLhttpRequest.body, ' with method ', FXMLhttpRequest.method);
        var resource = FXMLhttpRequest.url.substring(server.my_url.length, FXMLhttpRequest.url.length)
        if (FXMLhttpRequest.method === 'GET') {
            this.handle_GET(resource, FXMLhttpRequest.body, respond_method);
        }
        else if (FXMLhttpRequest.method === 'POST') {   
            this.handle_POST(resource, FXMLhttpRequest.body, respond_method);
        }
        else if (FXMLhttpRequest.method === 'PUT') {
            this.handle_PUT(resource, FXMLhttpRequest.body, respond_method);
        }
        else if (FXMLhttpRequest.method === 'DELETE') {
            this.handle_DELETE(resource, FXMLhttpRequest.body, respond_method);
        }
        FXMLhttpRequest.status = 4;
    }

    /**
     * this function represent 'GET' method
     * @param {string} resource the resource that needed
     * @param {string} body the body of the request
     * @param {Function} on_ready_callback function to activete when the call is finish
     */
    static handle_GET(resource, body, on_ready_callback){
        
        var options = []

        
        options.push(["/SignIn", function (resource, body, on_ready_callback){
            // do this and that
            // get user 
            var user = Database.getUser(body.username, body.password)
            // if user exists
            if (user !== undefined) {
                console.log('user exists', user)

                var response = {status: 200,
                    user: user}
               on_ready_callback(response);
            }
            else {
                console.log('server: user does not exist')
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
            var Tasks = Database.getMissions(body.userId);
            if (Tasks !== undefined) {
                var tasks_list = []
                for (var i = 0; i < Tasks.length; i++){
                    tasks_list.push({title : Tasks[i].text, id : Tasks[i].id, done : Tasks[i].done});
                }
                var response = {status: 200, userId : body.userId,
                    tasks : tasks_list }
                on_ready_callback(response);
            }
            // call on_ready_callback when done
            
        }]);

        server.go_over_options(options, resource, body, on_ready_callback);
    }

    /**
     * this function represent 'POST' method
     * @param {string} resource the resource that needed
     * @param {string} body the body of the request
     * @param {Function} on_ready_callback function to activete when the call is finish
     */
    static handle_POST(resource, body, on_ready_callback){
        var options = []
        
        options.push(["/RestoreTask", function (resource, body, on_ready_callback){
            // do this and that
            var response = {}
            var mission = Database.restoreMission(body.taskId);
            if (mission !== undefined) {
                response = {status: 200, userId : body.userId,
                    task : {title : mission.text, id : mission.id, done : mission.done} }
                
            }else{
                response = {status: 404, userId : body.userId,
                    task : undefined }
                
            }
            on_ready_callback(response);
        }]);


        server.go_over_options(options, resource, body, on_ready_callback);
    }
    
    /**
     * this function represent 'PUT' method
     * @param {string} resource the resource that needed
     * @param {string} body the body of the request
     * @param {Function} on_ready_callback function to activete when the call is finish
     */
    static handle_PUT(resource, body, on_ready_callback){
        var options = []
        options.push(["/CreateTask", function (resource, body, on_ready_callback){
            // do this and that
            var response = {}
            var mission = Database.addMission(body.userId, body.title);
            if (mission !== undefined) {
                response = {status: 200, userId : body.userId,
                    task : {title : mission.text, id : mission.id, done : mission.done} }
                
            }else{
                response = {status: 404, userId : body.userId,
                    task : undefined }
                
            }
            on_ready_callback(response);
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
        
        server.go_over_options(options, resource, body, on_ready_callback);
    }    
    /**
     * this function represent 'DELETE' method
     * @param {string} resource the resource that needed
     * @param {string} body the body of the request
     * @param {Function} on_ready_callback function to activete when the call is finish
     */
    static handle_DELETE(resource, body, on_ready_callback){
        var options = []

        options.push(["/DeleteTask", function (resource, body, on_ready_callback){
            // do this and that
            var response = {}

            var mission = Database.removeMission(body.taskId);
            if (mission !== undefined) {
                response = {status: 200, 
                    task : {title : mission.title, id : mission.id, done : mission.done} }
            }
            else {
                response = {status: 404, 
                    task : undefined }
            }
            on_ready_callback(response);
        }]);

        server.go_over_options(options, resource, body, on_ready_callback);
    }

    /**
     * function that check which option choosen from the method and actived it
     * @param {Array} options all the option of method
     * @param {string} resource the resource that needed
     * @param {string} body the body of the request
     * @param {Function} on_ready_callback function to activete when the call is finish
     */
    static go_over_options(options, resource, body, on_ready_callback){
        for (var i = 0; i < options.length; i++) {
            
            if(resource === options[i][0]){
                console.log('server: comparing ', options[i][0], ' === ', resource);
                options[i][1](resource, body, on_ready_callback);
                break;
            }
        }
    }
}