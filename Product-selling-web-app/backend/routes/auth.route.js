const express = require('express')
const { authController } = require('../controller')
const {authValidation} = require('../validation/')
const validator = require('../middleware/validator')

const router = express.Router()

router.post('/signup', validator(authValidation.signupValidation), authController.signup)

router.post('/signin', validator(authValidation.singinValidation), authController.signin)

module.exports = router