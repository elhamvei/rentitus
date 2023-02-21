const httpStatus = require('http-status')
const { User } = require('../model')
const utility = require('../utils/utility')

const signup = async (req, res) => {
    try {
        if(await User.isEmailTaken(req.body.email)) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Email Already Taken"})
        }
        const user = await User.create(req.body)
        if(!user) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Bad Request"})
        }
        res.status(httpStatus.OK).json({message: "User Successfully Registered..."})
    }catch(err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: err.message})
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user || !(await user.isPasswordMatch(password))) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "Bad Credentials"})
        }
        const token = await utility.generateAuthToken(user)
        res.status(httpStatus.OK).json ({
            user, token
        })
    }catch(err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: err.message})
    }
}

module.exports = {
    signup,
    signin
}