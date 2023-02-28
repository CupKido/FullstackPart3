import { Mission } from "./mission.js";

export class Database {

    static load(key){
        /**
         * @param {string} key the name of the loaded list
         * 
         * this function load list of elements from Local Storage
         * if the key is not exists, new element will be created 
         */
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
        /**
         * @param {string} key the name of saved list
         * @param {any} value the object to save with the name given
         * 
         * this funcction will save an object in Local Storage
         */
        localStorage.setItem(key,JSON.stringify(value))
    }

    static getUser(userId){
        /**
         * @param userId the user ID that want be loaded
         * 
         * load user from database by user Id
         * 
         */
        var users = Database.load('Users')
        users[userId.toString()] = userId
        return users[userId.toString()]
    }

    static getUser(username,password){
        /**
         * function that check if the username with the password given is exists.
         * if so, the user returned else undefined returned
         */
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
        /**
         * funtion that load all the mission of user by userId
         */
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
        /**
         * function that add new user to the database
         */
        var users = Database.load('Users')
        
        console.log(JSON.parse(JSON.stringify(user.json())))
        console.log(user.json())
        console.log(JSON.stringify(user.json()))
        user.id = Object.keys(users).length
        users[user.id] = user.json()

        Database.save('Users', users)
    }

    static addMission(userId,text){
        /**
         * function to add mission to user and save it in the database
         */
        var missions = Database.load('Missions')
        var new_id = Object.keys(missions).length
        var mission = new Mission(text,userId, new_id)
        missions[new_id] = mission.json()
        Database.save('Missions', missions)
        return mission
    }

    static removeUser(userId){
        /**
         * funtion to delete user from database
         */
        var users=Database.load('Users')

        delete users[userId]

        Database.save('Users',users)
    }

    static removeMission(missionId){
        /**
         * function that mark mission as finish in the database
         */
        var missions=Database.load('Missions')

        var missionIndex = undefined
        for(const obj in Object.keys(missions)){
            if (missions[obj].id==missionId){
                missionIndex = obj
                break
            }
        }
        
        if (missionIndex !== undefined){
            var mission = missions[missionIndex]
            mission['done'] = true
            missions[missionIndex] = mission
            Database.save('Missions',missions)
            return mission
        }
        else{
            console.log('Doesnt Exists')
            return undefined
        }

        
    }

    static restoreMission(missionId){
        /**
         * function that unmark existing mission as finish
         */
        var missions=Database.load('Missions')

        var missionIndex = undefined
        for(const obj in Object.keys(missions)){
            if (missions[obj].id==missionId){
                missionIndex = obj
                break
            }
        }
        
        if (missionIndex !== undefined){
            var mission = missions[missionIndex]
            mission['done'] = false
            missions[missionIndex] = mission
            Database.save('Missions',missions)
            return mission
        }
        else{
            console.log('Doesnt Exists')
            return undefined
        }

        
    }
}