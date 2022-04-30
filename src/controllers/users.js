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
    findAll() {
        return this.crudBusiness.findAll()
    }
    update(userData) {
        return this.crudBusiness.update(userData)
    }
    delete(id) {
        return this.crudBusiness.delete(id)
    }
}