const Accounts = require('../../models/accounts.model');
const Roles = require('../../models/roles.model');

const ApiError = require('../../helpers/api-error');
const bcrypt = require('bcrypt');

// [GET] /admin/accounts
module.exports.index = async (req, res, next) => {
  try {
    if (!res.locals.role.permissions.includes('accounts_view')) {
      return next(
        new ApiError(403, 'No permission allowed')
      );
    }

    const accounts = await Accounts.find({ deleted: false });
    const accountsWithRoles = [];

    for (const account of accounts) {
      const role = await Roles.findOne({ _id: account.role_id });
      const accountWithRole = { ...account._doc, role };
      accountsWithRoles.push(accountWithRole);
    }

    res.send({
      success: true,
      accounts: accountsWithRoles,
      permissions: {
        editAllowed: res.locals.role.permissions.includes('accounts_edit'),
        createAllowed: res.locals.role.permissions.includes('accounts_create'),
        deleteAllowed: res.locals.role.permissions.includes('accounts_delete')
      }
    });
  } catch (error) {
    console.log('Error occured:', error);
    return next(new ApiError(500, error));
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;

    const account = await Accounts.findOne({
      _id: id, 
      deleted: false
    });

    if (!account) {
      return next(
        new ApiError(404, 'Can not find account information')
      );
    }

    res.json({
      success: true,
      message: "Found",
      data: account
    });

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res, next) => {
  try {

    const account = req.body.account;
    if(account.password) {
      account.password = await bcrypt.hash(account.password, 10);

    } else {
      delete req.body.password;
    }

    if (req.file) { 
      account.avatar = req.body[req.file.fieldname];
    }    
 
    const newAccount = new Accounts(req.body.account); 
    await newAccount.save();

    res.json({
      success: true,
      message: 'Account successfully created!'
    })

  } catch (error) {
    console.log('error:', error)
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/accounts/change-status/:status/:id
module.exports.changeStatus = async (req, res, next) => {
  try {
    let id = req.params.id;
    let status = req.params.status;

    await Accounts.updateOne(
      { _id:  id}, 
      { 
        status: status,
      }
    );

    res.send(true)

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res, next) => {
  try {
    const id = req.params.id;

    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
 
    req.body.account.avatar = req.body.avatar;

    await Accounts.updateOne(
      { _id: id, },
      { 
        ...req.body.account,
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

// [DELETE] /admin/product-categories/delete/:id
module.exports.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Accounts.updateOne({ _id: id }, { 
      deleted: true,
    });

    res.json(true);

  } catch (error) {
    console.log('Error occurred:', error);
    return next(
      new ApiError(500, error)
    );
  }
}
