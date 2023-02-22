
export class Database {

    load(key){
        return JSON.parse(localStorage.getItem(key))
    }
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }

    static search(userId){
        users = load('Users')

        return users.
    }

    static get(userId){

    }

    static addUser(user){
        users = load('Users')

        user.id = users.length
        users.push(user)

        save('Users', users)
    }

    static addMession(userId,text){

    }

    static addSubMession(messionId,text){

    }

    static update(userId,mession){

    }

    static remove(userId){

    }

    static remove(messionId){

    }


}