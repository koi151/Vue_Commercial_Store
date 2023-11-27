const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const productCategoriesSchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type: String,
    default: ""
  },
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { 
    type: String, 
    slug: "title",
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createAt: Date,
  deletedAt: Date
})

const ProductCategories = mongoose.model("ProductCategories", productCategoriesSchema, "product-categories");

module.exports = ProductCategories;