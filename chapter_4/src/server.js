import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) 
const __publicPath = path.join(__dirname, '../public')

// Middleware
app.use(express.json())
app.use(express.static(__publicPath))

// IF it declare after "app.use(express.static(__publicPath))", no matter what root "/" will always show "index.html"
app.get('/', (req, res) => {
  res.sendFile(path.join(__publicPath, 'index2.html'))
})

app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => {
  console.log('server has started', PORT)
})
