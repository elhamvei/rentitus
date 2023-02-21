const Joi = require('joi');

const signupValidation = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    
}

const singinValidation = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
}

module.exports = {
    signupValidation,
    singinValidation
}