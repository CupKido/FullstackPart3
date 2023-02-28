export class Mission{
    /**
     * 
     * @param {string} missionText text of the mission
     * @param {number} userId the userid that the mission related
     * @param {number} id the id of the mission itself
     */
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