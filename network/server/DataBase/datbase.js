import { Mission } from "./mission";

export class Database {

    load(key){
        var templist = localStorage.getItem(key);
        
        if (templist){
            return JSON.parse(localStorage.getItem(key))
        }
        else{
            localStorage.setItem(key,'{}')
        }
    }
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }

    static getUser(userId){
        users = load('Users')

        return users[userId.toString()]
    }

    static getUser(username, password){
        users = load('Users')

        for (const key in users){
            if (users[key].username === username && users[key].password === password){
                return users[key]
            }
        }
        return undefined
    }

    static getMissions(userId){
        user = this.getUser(userId)
        missions  = load('Missions')
        final_list = []
        for (const mission of  missions){
            if (mission.userId===userId){
                final_list.push(mission)
            }
        }

        return final_list
    }

    static addUser(user){
        users = load('Users')

        users[Object.keys(users).length.toString()] = JSON.stringify(user)

        save('Users', users)
    }

    static addMission(userId,text){
        missions = load('Missions')
        missions.push(JSON.stringify(Mission(text,userId,missions.length)))

        save('Missions', missions)
    }

    static removeUser(userId){
        users=load('Users')

        delete users[userId.toString()]

        save('Users',users)
    }

    static removeMission(missionId){
        missions=load('Missions')

        missionIndex = missions.findIndex(function(mes){return mes.id==missionId})
        
        if (missionIndex){
            missions.splice(missionIndex,1)
        }
        else{
            console.log('Dont Exists')
        }

        save('Missions',missions)
    }

}