import User from "../models/user"
import { NotFoundException, IncompleteDataException, WithoutDataException, ConflictException } from '../models/exceptions'

export default class UserBusiness {
    constructor(serviceDA) {
        if (!serviceDA) throw Error('ServiceDA não foi injetado')
        this.serviceDA = serviceDA
    }
    insert(user) {
        if (!user || !Object.keys(user).length)
            throw new WithoutDataException()
        const userModel = new User(user)
        if (!userModel.validUserCreate())
            throw new IncompleteDataException()
        if (this.findByEmail(user.email))
            throw new ConflictException()
        return this.serviceDA.insert(userModel)
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
        if (!userDTO || !Object.keys(userDTO).length)
            throw new WithoutDataException()

        const userModel = new User(userDTO)

        if (!userModel.validUserUpdate())
            throw new IncompleteDataException()

        const user = this.find(userDTO.id)
        if (!user) throw new NotFoundException()

        if (userDTO.email !== user.email && this.findByEmail(userDTO.email))
            throw new ConflictException()

        return this.serviceDA.update(userDTO)
    }
    delete(id) {
        const userExists = this.find(id)
        if (!userExists) throw new NotFoundException()
        return this.serviceDA.delete(id)
    }
}