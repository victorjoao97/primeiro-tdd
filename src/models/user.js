export default class User {
    constructor(data) {
        this.name = data.name
        this.email = data.email
    }
    validUser() {
        return this.name && this.email
    }
}