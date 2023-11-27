const Products = require('../../models/products.model');

const ApiError = require('../../helpers/api-error');
const ProductsHelper = require('../../helpers/products')

module.exports.index = async (req, res, next) => {
  try {
    const featuredProducts = await Products.find({
      deleted: false,
      status: "active",
      featured: "1"
    }).sort({ position: "desc" }).limit(4);

    const newFeaturedProducts = ProductsHelper.productsNewPrice(featuredProducts);

    const products = await Products.find({
      status: "active",
      deleted: false
    })

    res.json({
      products: products,
      featuredProducts: newFeaturedProducts
    });
    
  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

