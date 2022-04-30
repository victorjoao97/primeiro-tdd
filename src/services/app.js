import express from 'express'
import UsersController from '../controllers/users'
import UserBusiness from '../business/users'
import User from '../models/user'
import DA from './da'
import {ConflictException, IncompleteDataException, NotFoundException, WithoutDataException} from '../models/exceptions'

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

        try {
            return res.json(userController.add(userData))
        } catch (error) {
            if (error instanceof NotFoundException)
                return res.status(404).send()
            else if (error instanceof ConflictException)
                return res.status(409).send()
            else if (error instanceof WithoutDataException || error instanceof IncompleteDataException)
                return res.status(400).send()

            return res.status(500).send()
        }
    })

    app.put('/', (req, res) => {
        const userData = req.body
        try {
            return res.json(userController.update(userData))
        } catch (error) {
            if (error instanceof NotFoundException)
                return res.status(404).send()
            else if (error instanceof ConflictException)
                return res.status(409).send()
            else if (error instanceof WithoutDataException || error instanceof IncompleteDataException)
                return res.status(400).send()

            return res.status(500).send()
        }
    })

    app.delete('/:userId', (req, res) => {
        const { userId } = req.params

        try {
            userController.delete(+userId)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof NotFoundException)
                return res.status(404).send()

            return res.status(500).send()
        }
    })

    return app
}
export default AppMake