const Products = require('../../models/products.model');
const ProductCategories = require('../../models/product-categories.model');

const ApiError = require('../../helpers/api-error');
const productsHelper = require('../../helpers/products')
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

// [GET] /products/
module.exports.index = async (req, res, next) => {
  try {
    const searchCriterias = {
      deleted: false,
    } 

    const objectSearch = searchHelper(req.query);

    if (objectSearch.keyword) {
      searchCriterias.title = objectSearch.regex;
    }  

    // PAGINATION
    let initPaginationObject = {
      limitItems: 8,
      currentPage: 1,
      totalPage: null
    }
    const productsCount = await Products.countDocuments(searchCriterias);
    const paginationObj = paginationHelper(initPaginationObject, req.query, productsCount); 

    // SORT
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.position = 'desc';
    }
    // END SORT

    const products = await Products.find(searchCriterias)
    .sort(sort)
    .limit(paginationObj.limitItems)
    .skip(paginationObj.skip);

    const newProducts = productsHelper.productsNewPrice(products);

    res.send({
      success: true,
      products: newProducts,
      pagination: paginationObj
    });
    
  } catch (error) {
    console.log('ERROR OCCURRED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.productSlug;
    let product = await Products.findOne({ 
      slug: slug,
      deleted: false,
      status: 'active'
    })

    if (product.product_category_id) {
      const category = await ProductCategories.findOne({
        _id: product.product_category_id,
        deleted: false,
        status: "active"
      });

      product.category = category;
    }

    const newPrice = productsHelper.productNewPrice(product);
    product = {...product._doc, newPrice}

    res.json({
      success: true,
      product: product
    })

  } catch (error) {
    console.log("ERROR OCCURRED:", error);
    // req.flash('error', 'Page is not exists, directed to home page');
    res.redirect("back");
  }
}