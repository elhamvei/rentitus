const httpStatus = require("http-status")
const { Category } = require('../model')

const getCategory = async (req, res) => {
    try {
        const category = await Category.find({})
        res.status(httpStatus.OK).json({category})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}

const addCategory = async (req, res) => {
    const { name } = req.body
    try {
        await Category.create({name})
        res.status(httpStatus.OK).json({message: "Category Created"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}

const editCategory = async (req, res) => {
    const categoryId = req.params.id
    try {
        await Category.findByIdAndUpdate(categoryId, req.body, {new: true})
        res.status(httpStatus.OK).json({message: "Category Updated"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
} 

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    try {   
        await Category.findByIdAndDelete(categoryId)
        res.status(httpStatus.OK).json({message: "Category Deleted"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err: err.message})
    }
}

module.exports = {
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}