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
    }


}