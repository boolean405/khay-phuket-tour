const bcrypt = require('bcryptjs');

module.exports = {
    encode: payload => bcrypt.hashSync(payload),
    fMsg: (res, msg = '', result = []) => res.status(200).json({ con: true, msg, result })
}