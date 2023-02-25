import { Mession } from "./mession";

export class Database {

    load(key){
        return JSON.parse(localStorage.getItem(key))
    }
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }

    static getUser(userId){
        users = load('Users')

        return users[userId.toString()]
    }

    static getUser(username,password){
        users = load('Users')

        for (const key in users){
            if (users[key].username === username && users[key].password === password){
                return users[key]
            }
        }
        return undefined
    }

    static getMessions(userId){
        user = this.getUser(userId)
        messions  = load('Messions')
        final_list = []
        for (const mession of  messions){
            if (mession.userId===userId){
                final_list.push(mession)
            }
        }

        return final_list
    }

    static addUser(user){
        users = load('Users')

        users[Object.keys(users).length.toString()] = JSON.stringify(user)

        save('Users', users)
    }

    static addMession(userId,text){
        messions = load('Messions')
        messions.push(JSON.stringify(Mession(text,userId,messions.length)))

        save('Messions', messions)
    }

    static removeUser(userId){
        users=load('Users')

        delete users[userId.toString()]

        save('Users',users)
    }

    static removeMession(messionId){
        messions=load('Messions')

        messionIndex = messions.findIndex(function(mes){return mes.id==messionId})
        
        if (messionIndex){
            messions.splice(messionIndex,1)
        }
        else{
            console.log('Dont Exists')
        }

        save('Messions',messions)
    }

}