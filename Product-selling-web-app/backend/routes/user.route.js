const express = require('express')
const auth = require('../middleware/auth')
const validator = require('../middleware/validator')
const {userController} = require('../controller')
const {userValidation} = require('../validation')

const router = express.Router()

router.route('/profile')
    .get(
        auth,
        userController.getProfile
    )
    .put(
        auth,
        validator(userValidation.user),
        userController.editProfile
    )
module.exports = router