const Joi = require('joi');

module.exports = {
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required()
        }),
        patch: Joi.object({
            name: Joi.string().required()
        })
    },

    RoleSchema: {
        add: Joi.object({
            name: Joi.string().required()
        }),
        patch: Joi.object({
            name: Joi.string().required()
        }),
        addPermit: Joi.object({
            role_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permit_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        removePermit: Joi.object({
            role_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permit_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },

    UserSchema: {
        register: Joi.object({
            name: Joi.string().min(4).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(8).max(12).required(),
            password: Joi.string().min(8).max(16).required(),
            re_password: Joi.ref('password'),
        }),
        login: Joi.object({
            phone: Joi.string().min(8).max(12).required(),
            password: Joi.string().min(8).max(16).required(),
        })

    },

    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}