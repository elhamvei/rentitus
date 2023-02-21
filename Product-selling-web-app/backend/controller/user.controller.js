const httpStatus = require('http-status')
const {User} = require('../model')

const getProfile = async (req, res) => {
    const userId = req.user.userId
    try {
        const user = await User.findById(userId).select('-password -_id').populate('products')
        res.status(httpStatus.OK).json({profile: user})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err})
    }
}

const editProfile = async (req, res) => {
    const userId = req.user.userId
    try {
        await User.findByIdAndUpdate({_id: userId}, req.body, {new: true})
        res.status(httpStatus.OK).json({message: "Profile Updated"})
    }catch(err) {
        res.status(httpStatus.SERVICE_UNAVAILABLE).json({err})
    }
    
}

module.exports = {
    getProfile,
    editProfile
}