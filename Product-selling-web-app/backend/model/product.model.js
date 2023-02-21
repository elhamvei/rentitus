const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product