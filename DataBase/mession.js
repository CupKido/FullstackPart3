

class Mession{

    constructor(mession){
        this.mession = mession
        this.id = undefined
        this.subMessions = []
    }

    addSubMession(mession){
        mession.id  = this.subMessions.length
        this.subMessions.push(mession)
    }

    searchSubMession(mession){

    }

    removeSubMession(mession){
    }

}