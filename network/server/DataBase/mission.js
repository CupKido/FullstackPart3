export class Mission{
    constructor(messionTest,userId,id){
        this.text = messionTest
        this.userId = userId
        this.id = id
        this.done = false
    }

    json(){
        return {text:this.text,
                userId :this.userId,
                id:this.id,
                done:this.done}
    }
}