import { Mission } from "./mission.js";

export class Database {

    static load(key){
        var templist = localStorage.getItem(key);
        //console.log(templist)
       
        if (templist){
            templist = JSON.parse(templist)
            return templist
        }
        else{
            localStorage.setItem(key,'{}')
            return {}
        }
    }

    static save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }

    static getUser(userId){
        var users = Database.load('Users')
        users[userId.toString()] = userId
        return users[userId.toString()]
    }

    static getUser(username,password){
        var users = Database.load('Users')
        for (const key in users){
            if (users[key].username === username && users[key].password === password){
                users[key]['id'] = key
                return users[key]
            }
        }
        return undefined
    }

    static getMissions(userId){
        var user = Database.getUser(userId)
        var missions = Database.load('Missions')
        var final_list = []
        for (const mission of Object.values(missions)){
            if (mission.userId===userId){
                final_list.push(mission)
            }
        }
        return final_list
    }

    static addUser(user){
        var users = Database.load('Users')
        
        console.log(JSON.parse(JSON.stringify(user.json())))
        console.log(user.json())
        console.log(JSON.stringify(user.json()))
        user.id = Object.keys(users).length
        users[user.id] = user.json()

        Database.save('Users', users)
    }

    static addMission(userId,text){
        var missions = Database.load('Missions')
        var new_id = Object.keys(missions).length
        var mission = new Mission(text,userId, new_id)
        missions[new_id] = mission.json()
        Database.save('Missions', missions)
        return mission
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