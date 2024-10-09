const jwt = require('jsonwebtoken');
const Redis = require('./redis');
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            let result = schema.validate(req.body);
            if (result.error) {
                // result.error.details.forEach(err => next(new Error(err.message)));
                next(new Error(result.error.details[0].message));

            } else {
                next();
            }
        }
    },

    validateParam: (schema, param) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${param}`] = req.params[`${param}`];
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },

    validateToken: () => {
        return async (req, res, next) => {
            let token = req.headers.authorization.split(' ')[1];
            let decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded) {
                let user = await Redis.get(decoded._id);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    next(new Error('Tokenization Error'))
                }
            } else {
                next(new Error('Tokenization Error'))
            }

        }
    }


}