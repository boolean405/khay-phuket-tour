const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    sub_categories: [{ type: Schema.Types.ObjectId, ref: 'sub_category' }],
    created_at: { type: Date, default: Date.now }
});

const Category = mongoose.model('category', CategorySchema);
module.exports = Category;