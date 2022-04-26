export default class UsersController {
    #crudBusiness
    constructor(crudBusiness) {
        if (!crudBusiness) throw Error('UserBusiness não foi injetado')
        this.crudBusiness = crudBusiness
    }
    add(userData) {
        return this.crudBusiness.insert(userData)
    }
    findId(userId) {
        return this.crudBusiness.find(userId)
    }
    update(userData) {
        return this.crudBusiness.update(userData)
    }
}