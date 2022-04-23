export default class {
    #crudBusiness
    constructor(crudBusiness) {
        this.crudBusiness = crudBusiness
    }
    addUser(userData) {
        return this.crudBusiness.insert(userData)
    }
}