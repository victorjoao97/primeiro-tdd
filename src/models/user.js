export default class User {
    constructor(data) {
        this.name = data.name
        this.email = data.email
        this.id = data.id
    }
    validUserCreate() {
        return this.name && this.email
    }
    validUserUpdate() {
        return (this.name || this.email) && this.id
    }
}