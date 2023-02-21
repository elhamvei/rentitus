const mongoose = require('mongoose')

const categorySchma = mongoose.Schema({
    name: {
        type: String,
    }
})

const Category = mongoose.model('category', categorySchma)

module.exports = Category