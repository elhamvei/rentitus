require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {connectDb} = require('./config/db')
const routes = require('./routes')
const app = express()

connectDb()
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(`${__dirname}/public`))

app.use('/api', routes)

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is up at port ${port}`))