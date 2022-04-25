import app from './services/app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`))