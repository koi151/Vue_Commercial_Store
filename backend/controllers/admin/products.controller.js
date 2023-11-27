const Products = require('../../models/products.model');

const ApiError = require('../../helpers/api-error');

const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');

// [GET] /admin/products
module.exports.index = async (req, res, next) => {
  try {
    if (!res.locals.role.permissions.includes('products_view')) {
      return next(
        new ApiError(403, 'No permission allowed')
      );
    }

    const searchCriterias = {
      deleted: false,
    } 

    const objectSearch = searchHelper(req.query);

    if (req.query.status)
      searchCriterias.status = req.query.status;
    if (objectSearch.keyword) {
      searchCriterias.title = objectSearch.regex;
    }  

    // PAGINATION
    let initPaginationObject = {
      limitItems: 5,
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

    res.send({
      products: products,
      pagination: paginationObj,
      permissions: {
        editAllowed: res.locals.role.permissions.includes('products_edit'),
        createAllowed: res.locals.role.permissions.includes('products_create'),
        deleteAllowed: res.locals.role.permissions.includes('products_delete')
      }
    })
    // res.send(products)

  } catch (error) {
    console.log('Error occured:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [GET] /admin/products/product-list
module.exports.getProductList = async (req, res, next) => {
  try {
    // const ids = req.body;
    console.log("req.body:", req.body)

    // const productList = await Products.find({ _id: { $in: ids } });

    // res.send({ 
    //   success: true,
    //   productList: productList
    // });

  } catch (error) {
    console.error('Error occurred:', error);
    return next(new ApiError(500, error));
  }
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const product = await Products.findOne({
      _id: id,
      deleted: false
    })

    // const category = await ProductCategory.find({ deleted: false });
    // const newCategory = createTreeHelper.tree(category);

    res.json(product)

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res, next) => {
  try {
    let id = req.params.id;
    let status = req.params.status;

    // const updatedBy = {
    //   account_id: res.locals.user.id,
    //   updatedAt: new Date()
    // }

    await Products.updateOne(
      { _id:  id}, 
      { 
        status: status,
        // $push: { updatedBy: updatedBy }
      }
    );

    res.send(true)

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}


// [POST] /admin/products/create
module.exports.createPost = async (req, res, next) => {
  try {
    let product = JSON.parse(JSON.stringify(req.body.product));
     
    if (product.price) 
      product.price = parseInt(product.price);
    if (product.discountPercentage)
      product.discountPercentage = parseInt(product.discountPercentage);
    if (product.stock)
      product.stock = parseInt(product.stock);
    
    if (!product.position) {
      const countProducts = await Products.countDocuments();
      product.position = countProducts + 1;
    } else {
      product.position = parseInt(product.position);
    }
    
    if (req.file) { 
      product.thumbnail = req.body[req.file.fieldname];
    }    

    // // req.body.createdBy = {
    // //   account_id: res.locals.user.id
    // // };

    const newProduct = new Products(product); 
    await newProduct.save();

    res.send({
      success: true
    });

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    if (req.file && req.file.filename) { 
      req.body.thumbnail = `/uploads/${req.file.filename}`
    }    

    await Products.updateOne(
      { _id: id, },
      { 
        ...req.body.product,
      }
    )

    res.send(true);

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Products.updateOne({ _id: id }, { 
      deleted: true,
      // deletedBy: {
      //   account_id: res.locals.user.id,
      //   deletedAt: new Date()
      // }
    });

    res.send(true);

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/products/multi-change/:status/:id
module.exports.multiChange = async (req, res, next) => {
  try {
    const type = req.body.type;
    const ids = req.body.checkedIds;

    // const updatedBy = {
    //   account_id: res.locals.user.id,
    //   updatedAt: new Date()
    // }

    switch(type) {
      case "active":
      case "inactive":  
        await Products.updateMany(
          { _id: {$in: ids} }, 
          { 
            status: type,
            // $push: { updatedBy: updatedBy }
          }
        );
        break;

      case "delete-all":  
        await Products.updateMany({ _id: {$in: ids} }, { 
          deleted: true,
          // deletedBy: {
          //   account_id: res.locals.user.id,
          //   deletedAt: new Date()
          // }
        });

      case "change-position":
        for (const item of ids) {
          const [id, position] = item.split('-');
          await Products.updateOne(
            { _id: id }, 
            { 
              position: position,
              // $push: { updatedBy: updatedBy }
            }
          );
        }
        break;
        
      default:
        break;
    } 
    res.send(true)

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}