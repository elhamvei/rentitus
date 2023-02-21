const Joi = require('joi');

const category = {
    body: Joi.object({
        name: Joi.string()
    })
    
}

module.exports = {
    category
}