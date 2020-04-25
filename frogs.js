class Frogs {
    constructor() {
        this.frogs = []
        this.level = 1
    }
    getFrogs() {
        return this.frogs
    }
    getFrogsCount() {
        return this.frogs.length
    }
    static getIdCount() {
        return Frogs.idCount
    }
    getLevel() {
        return this.level
    }
    add(frog) {
        this.frogs.push(frog)
    }
    delete(id) {
        for (let fIndex in this.frogs) {
            if (this.frogs[fIndex].id === id) {
                this.frogs.splice(fIndex, 1)
            }
        }
        if (this.frogs.length === 0) {
            this.level++
        }
    }

}
Frogs.idCount = 0