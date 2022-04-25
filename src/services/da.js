export default class DA {
    constructor(data) {
        this.data = data
        this.id = 1
    }
    insert(record) {
        record.id = this.id++
        this.data.push(record)
        return record
    }
    find(id) {
        return this.data.find(r => r.id === id) || null
    }
    where(filter) {
        return this.data.filter(filter)
    }
    update(recordToSave) {
        const recordIndex = this.data.findIndex(r => r.id === recordToSave.id)
        if (recordIndex < 0) return false
        Object.assign(this.data[recordIndex], recordToSave)
        return true
    }
    delete(id) {
        const recordIndex = this.data.findIndex(r => r.id === id)
        if (recordIndex < 0) return false
        this.data.splice(recordIndex, 1)
        return true
    }
}