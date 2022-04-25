export default class UsersController {
    #crudBusiness
    constructor(crudBusiness) {
        if (!crudBusiness) throw Error('UserBusiness não foi injetado')
        this.crudBusiness = crudBusiness
    }
    addUser(userData) {
        return this.crudBusiness.insert(userData)
    }
}