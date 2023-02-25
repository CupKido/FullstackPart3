export class Mission{
    constructor(missionText,userId,id){
        this.text = missionText
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