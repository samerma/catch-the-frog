class Frogs {
    constructor() {
        this.arr = []
        this.level = 1
    }
    getFrogs() {
        return this.arr
    }
    getFrogsCount() {
        return this.arr.length
    }
    static getIdCount() {
        return Frogs.idCount
    }
    getLevel() {
        return this.level
    }
    add(frog) {
        this.arr.push(frog)
    }
    delete(id) {
        for (let fIndex in this.arr) {
            if (this.arr[fIndex].id === id) {
                this.arr.splice(fIndex, 1)
            }
        }
        if (this.arr.length === 0) {
            this.level++
        }
    }

}
Frogs.idCount = 0