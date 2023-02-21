const Joi = require('joi');

const product = {
    body: Joi.object({
        name: Joi.string(),
        price: Joi.string(),
        description: Joi.string(),
        category: Joi.any(),
        image: Joi.string()
    })
    
}


module.exports = {
    product
}