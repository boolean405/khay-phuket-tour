const Joi = require('joi');

module.exports = {
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required()
        })
    }
}