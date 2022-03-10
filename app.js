require('dotenv').config()
require('express')

const express = require('express');
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const  notFoundMiddleware = require('./middleware/not-found')
const  errorHandler = require('./middleware/error-handler')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res)=>{
  res.send('<h1>Store API</h1> <a href="/api/vi/products"> route</a>')
})

app.use('/api/v1/products', productsRouter)

// product routes
app.use(notFoundMiddleware)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () =>{
  try {
    await connectDB(process.env.MONGO_DEV)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch(error) {
    console.log(error)
  }
}
start()