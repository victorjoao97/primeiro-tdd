import express from 'express'
import UsersController from '../controllers/users'
import UserBusiness from '../business/users'
import User from '../models/user'
import DA from './da'

const app = express()
app.use(express.json())

const userBs = new UserBusiness(new DA([]))

app.post('/', (req, res) => {
    const user = new UsersController(userBs)
    const userData = req.body
    if (!userData || !Object.keys(userData).length)
        return res.status(400).json('Nenhuma informação foi passada')
    const userModel = new User(userData)
    if (!userModel.validUser())
        return res.status(400).json('As informações estão incorretas')
    return res.json(user.addUser(userModel))
})

export default app