import express from 'express'
import UsersController from './controllers/users'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.post('/', (req, res) => {
    const user = new UsersController()
    const userData = req.body
    return res.json(user.addUser(userData))
})

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`))