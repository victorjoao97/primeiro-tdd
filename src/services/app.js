import express from 'express'
import UsersController from '../controllers/users'
import UserBusiness from '../business/users'
import User from '../models/user'
import DA from './da'

const app = express()
app.use(express.json())

const userBs = new UserBusiness(new DA([]))
const userController = new UsersController(userBs)

app.get('/:userId', (req, res) => {
    const {userId} = req.params
    const user = userController.findId(parseInt(userId))
    if (user)
        return res.json(user)
    else res.status(404).json()
})

app.post('/', (req, res) => {
    const userData = req.body
    if (!userData || !Object.keys(userData).length)
        return res.status(400).json('Nenhuma informação foi passada')
    const userModel = new User(userData)
    if (!userModel.validUser())
        return res.status(400).json('As informações estão incorretas')
    return res.json(userController.add(userModel))
})

app.put('/:userId', (req, res) => {
    const userData = req.body
    const {userId} = req.params
    if (!userData || !Object.keys(userData).length)
        return res.status(400).json(null)
    userData.id = parseInt(userId)
    const userModel = new User(userData)
    if (!userModel.minimalInfoUser())
        return res.status(400).json(null)
    if (!userController.findId(userModel.id))
        return res.status(404).json(null)
    return res.json(userController.update(userData))
})

export default app