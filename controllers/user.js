const DB = require('../models/user');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let dbUser = await DB.find().populate('roles permits');
    Helper.fMsg(res, 'All User', dbUser);
}
const register = async (req, res, next) => {
    let dbEmailUser = await DB.findOne({ email: req.body.email });
    if (dbEmailUser) {
        next(new Error('Email is already in use'));
        return;
    }

    let dbPhoneUser = await DB.findOne({ phone: req.body.phone });
    if (dbPhoneUser) {
        next(new Error('Phone Number is already in use'));
        return;
    }
    req.body.password = Helper.encode(req.body.password);
    let result = (await new DB(req.body).save());
    Helper.fMsg(res, 'User Register Success', result);

}

const login = async (req, res, next) => {
    let dbPhoneUser = await DB.findOne({ phone: req.body.phone }).populate('roles permits');
    if (dbPhoneUser) {
        if (Helper.comparePassword(req.body.password, dbPhoneUser.password)) {
            let user = dbPhoneUser.toObject();
            delete user.password;
            user.token = Helper.makeToken(user);
            Helper.set(user._id, user);
            Helper.fMsg(res, 'Login Success', user);
        } else {
            next(new Error('Incorrect Password'));
        }
    } else {
        next(new Error('No user found with Phone Number'));
    }
}

module.exports = {
    all,
    register,
    login
}