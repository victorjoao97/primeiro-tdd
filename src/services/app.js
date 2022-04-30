import express from 'express'
import UsersController from '../controllers/users'
import UserBusiness from '../business/users'
import User from '../models/user'
import DA from './da'

function AppMake(userBs = new UserBusiness(new DA([])), userController = new UsersController(userBs)) {
    const app = express()
    app.use(express.json())

    app.get('/:userId', (req, res) => {
        const { userId } = req.params
        const user = userController.findId(+userId)
        if (user)
            return res.json(user)
        else res.status(404).json()
    })

    app.get('/', (req, res) => {
        return res.json(userController.findAll())
    })

    app.post('/', (req, res) => {
        const userData = req.body
        if (!userData || !Object.keys(userData).length)
            return res.status(400).json('Nenhuma informação foi passada')
        const userModel = new User(userData)
        if (!userModel.validUserCreate())
            return res.status(400).json('As informações estão incorretas')

        try {
            return res.json(userController.add(userModel))
        } catch (error) {
            if (error.message === 'Não inserir registro duplicado')
                return res.status(409).json(error.message)
            else
                return res.status(500).send()
        }
    })

    app.put('/:userId', (req, res) => {
        const userData = req.body
        const { userId } = req.params
        if (!userData || !Object.keys(userData).length)
            return res.status(400).send()
        userData.id = parseInt(userId)
        const userModel = new User(userData)
        if (!userModel.validUserUpdate())
            return res.status(400).send()
        if (!userController.findId(userModel.id))
            return res.status(404).send()
        return res.json(userController.update(userData))
    })

    app.delete('/:userId', (req, res) => {
        const { userId } = req.params

        try {
            userController.delete(+userId)
            return res.status(204).send()
        } catch (error) {
            if (error.message === 'Não é possivel remover este usuário pois ele não existe')
                return res.status(404).send()
            else
                return res.status(500).send()
        }
    })

    return app
}
export default AppMake