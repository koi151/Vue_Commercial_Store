const ProductCategories = require('../../models/product-categories.model');

const systemConfig = require("../../config/system");

const ApiError = require('../../helpers/api-error');
const createTreeHelper = require('../../helpers/createTree');

// [GET] /admin/product-categories
module.exports.index = async (req, res, next) => {
  try {
    if (!res.locals.role.permissions.includes('product-categories_view')) {
      return next(
        new ApiError(403, 'No permission allowed')
      );
    }

    const categories = await ProductCategories.find({ deleted: false });
    const userRole = res.locals.role
    res.json({
      categories: categories,
      userRole: userRole,
      permissions: {
        editAllowed: res.locals.role.permissions.includes('product-categories_edit'),
        createAllowed: res.locals.role.permissions.includes('product-categories_create'),
        deleteAllowed: res.locals.role.permissions.includes('product-categories_delete')
      }
    });

  } catch (error) {
    console.log('Error occurred:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [GET] /admin/product-categories/create
module.exports.create = async (req, res, next) => {
  try {
    if (!res.locals.role.permissions.includes('product-categories_create')) {
      return next(
        new ApiError(403, 'No permission allowed')
      );
    }

    const records = await ProductCategories.find({
      deleted: false
    });
      
    const newRecords = createTreeHelper.tree(records);

    res.json(newRecords);

  } catch (error) {
    console.log('Error occurred:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [POST] /admin/product-categories/create
module.exports.createPost = async (req, res, next) => {
  try {
    let category = req.body.category;
    
    if (!category.position) {
      const countProducts = await ProductCategories.countDocuments();
      category.position = countProducts + 1;
    } else {
      category.position = parseInt(category.position);
    }
    
    if (req.file) { 
      category.thumbnail = req.body[req.file.fieldname];
    }    

    const newCategory = new ProductCategories(category); 
    await newCategory.save();

    res.json({
      success: true,
    });

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [GET] /admin/product-categories/edit/:id
module.exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await ProductCategories.findOne({
      _id: id, 
      deleted: false
    });

    const records = await ProductCategories.find({
      deleted: false
    });
      
    const newRecords = createTreeHelper.tree(records);

    res.json({
      category: category,
      records: newRecords
    });

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/product-categories/edit/:id
module.exports.editPatch = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    if (req.file && req.file.filename) { 
      req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    await ProductCategories.updateOne(
      { _id: id, },
      { 
        ...req.body.category,
        // $push: { updatedBy: updatedBy }
      }
    )

    res.json(true)

  } catch (error) {
    console.log('error:', error)
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/products-category/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    // const updatedBy = {
    //   account_id: res.locals.user.id,
    //   updatedAt: new Date()
    // }

    await ProductCategories.updateOne(
      { _id: req.params.id  }, 
      {
        status: req.params.status,
        // $push: { updatedBy: updatedBy }
      }
    )

    res.json(true);

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [DELETE] /admin/product-categories/delete/:id
module.exports.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    await ProductCategories.updateOne({ _id: id }, { 
      deleted: true,
      // deletedBy: {
      //   account_id: res.locals.user.id,
      //   deletedAt: new Date()
      // }
    });

    res.json(true);

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}
