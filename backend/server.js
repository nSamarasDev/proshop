import express  from 'express'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// Custom middleware access point
// app.use((req, res, next) => {
//     console.log(req.originalUrl)
//     next()
// })

app.get('/', (req, res) => {
    res.send('API is running...Hi Nick...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
res.send(process.env.PAYPAL_CLIENT_ID)
)


// Error middleware access point
// This error responds json trace to Postman
app.use(notFound)

// Error middleware access point
// Set status code before error
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))