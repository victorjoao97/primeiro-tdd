import express from 'express'
import UsersController from './controllers/users'

const app = express()
const PORT = process.env.PORT || 3000

app.post('/', (req, res) => {
    const user = new UsersController()
    const userData = req.body
    return res.json(user.addUser(userData))
})

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`))