import User from "../models/user"

export default class UserBusiness {
    constructor(serviceDA) {
        if (!serviceDA) throw Error('ServiceDA não foi injetado')
        this.serviceDA = serviceDA
    }
    insert(user) {
        if (!(user instanceof User))
            throw Error('Os dados devem pertencer a uma instancia de User')
        if (this.findByEmail(user.email))
            throw Error('Não inserir registro duplicado')
        return this.serviceDA.insert(user)
    }
    find(id) {
        return this.serviceDA.find(id)
    }
    findAll() {
        return this.serviceDA.findAll()
    }
    findByEmail(email) {
        return this.serviceDA.where(r => r.email === email)[0] || null
    }
    update(userDTO) {
        const user = this.find(userDTO.id)
        if (!user)
            throw Error('Não é possivel atualizar este usuário pois ele não existe')
        if (userDTO.email !== user.email && this.findByEmail(userDTO.email))
            throw Error('Este email já está sendo utilizado')
        return this.serviceDA.update(userDTO)
    }
    delete(id) {
        const userExists = this.find(id)
        if (!userExists)
            throw Error('Não é possivel remover este usuário pois ele não existe')
        return this.serviceDA.delete(id)
    }
}