import { Mission } from "./mission.js";

export class Database {

    static load(key){
        return JSON.parse(localStorage.getItem(key))
    }
    static save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }

    static getUser(userId){
        var users = Database.load('Users')

        return users[userId.toString()]
    }

    static getUser(username,password){
        var users = Database.load('Users')

        for (const key in users){
            if (users[key].username === username && users[key].password === password){
                return users[key]
            }
        }
        return undefined
    }

    static getMissions(userId){
        var user = this.getUser(userId)
        var missions  = load('Missions')
        var final_list = []
        for (const mission of  missions){
            if (mission.userId===userId){
                final_list.push(mission)
            }
        }

        return final_list
    }

    static addUser(user){
        var users = Database.load('Users')

        users[Object.keys(users).length.toString()] = JSON.stringify(user)

        Database.save('Users', users)
    }

    static addMission(userId,text){
        var missions = load('Missions')
        missions.push(JSON.stringify(Mission(text,userId,missions.length)))

        Database.save('Missions', missions)
    }

    static removeUser(userId){
        var users=Database.load('Users')

        delete users[userId.toString()]

        Database.save('Users',users)
    }

    static removeMission(missionId){
        var missions=Database.load('Missions')

        var missionIndex = missions.findIndex(function(mes){return mes.id==missionId})
        
        if (missionIndex){
            missions.splice(missionIndex,1)
        }
        else{
            console.log('Dont Exists')
        }

        Database.save('Missions',missions)
    }

}