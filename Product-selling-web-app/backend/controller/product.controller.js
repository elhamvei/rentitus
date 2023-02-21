const httpStatus = require('http-status')
const { Product, User } = require('../model')
const fs = require('fs')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({userId: { '$ne': req.user.userId }, isAvailable: true})
        res.status(httpStatus.OK).json({products})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err})
    }
}

const getMyProduct = async (req, res) => {
    try {
        const products = await Product.find({userId: req.user.userId})
        res.status(httpStatus.OK).json({products})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err})
    }
}

const buyProduct = async (req, res) => {
    const productId = req.params.id
    const userId = req.user.userId
    try {
        const product = await Product.findByIdAndUpdate(productId, {isAvailable: false}, {new: true})
        const user = await User.findById(userId)
        user.products.push(product._id)
        await user.save()
        res.status(httpStatus.OK).json({message: "Product Saled"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err})
    }
}

const addProducts = async (req, res) => {
    const {name, price, description, category} = req.body
    const image = req.file
    try {
        await Product.create({
            name, price, description, category, image: image.path,
            userId: req.user.userId
        })

        res.status(httpStatus.OK).json({message: "Product Added"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}

const getProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        res.status(httpStatus.OK).json({product})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.messsage})
    }
}

const editProduct = async (req, res) => {
    const productId = req.params.id
    try {
        await Product.findOneAndUpdate({ _id: productId }, req.body, {new: true})
        res.status(httpStatus.OK).json({message: "Product Updated"})
    }catch(err) { 
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findOneAndDelete({ _id: productId })
        fs.unlinkSync(product.image)
        res.status(httpStatus.OK).json({message: "Product Deleted"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}


module.exports = {
    getProducts,
    addProducts,
    getProduct,
    editProduct,
    deleteProduct,
    getMyProduct,
    buyProduct
}