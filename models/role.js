const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, require: true, unique: true },
    permit: [{ type: Schema.Types.ObjectId, 'ref': 'permit' }],
    created: { type: Date, default: Date.now }
});

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;