export default class UserBusiness {
    constructor(serviceDA) {
        if (!serviceDA) throw Error('ServiceDA não foi injetado')
        this.serviceDA = serviceDA
    }
    insert(user) {
        if (this.findByEmail(user.email))
            throw Error('Não inserir registro duplicado')
        return this.serviceDA.insert(user)
    }
    find(id) {
        return this.serviceDA.find(id)
    }
    findByEmail(email) {
        return this.serviceDA.where(r => r.email === email)[0] || null
    }
    update(user) {
        return this.serviceDA.update(user)
    }
    delete(id) {
        return this.serviceDA.delete(id)
    }
}