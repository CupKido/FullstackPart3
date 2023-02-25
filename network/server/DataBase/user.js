

export class User{

    constructor(username,password,fname,lname) {
     this.username = username
     this.password = password
     this.fname = fname
     this.lname = lname

     this.id  = undefined
    };

    json(){
        return {username:this.username,
                password:this.password,
                fname:this.fname,
                lname:this.lname,
                id:this.id}
    }
}