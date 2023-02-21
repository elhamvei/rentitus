const Joi = require('joi');

const user = {
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        phoneNumber: Joi.string(),
        email: Joi.any(),
        password: Joi.string()
    })
    
}


module.exports = {
    user
}