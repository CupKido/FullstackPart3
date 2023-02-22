

class User{

    constructor(username,password,fname,lname) {
     this.username = username
     this.password = password
     this.fname = fname
     this.lname = lname

     this.id  = undefined
     this.todoList = []   
    }

    addMession(mession){
        mession.id =  this.todoList.length
        this.todoList.push(mession)
    }
}