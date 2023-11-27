const Roles = require('../../models/roles.model');

const ApiError = require('../../helpers/api-error');

// [GET] /admin/roles/
module.exports.index = async (req, res, next) => {
  try {
    if (!res.locals.role.permissions.includes('roles_view')) {
      return next(
        new ApiError(403, 'No permission allowed')
      );
    }

    const roles = await Roles.find({ deleted: false });
    res.json({
      success: true,
      roles: roles,
      permissions: {
        editAllowed: res.locals.role.permissions.includes('roles_edit'),
        createAllowed: res.locals.role.permissions.includes('roles_create'),
        deleteAllowed: res.locals.role.permissions.includes('roles_delete')
      }
    })    

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res, next) => {
  try {
    const id = req.params.id;
    const role = await Roles.findOne({ _id: id }) 

    res.json(role)

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Roles.updateOne({ _id: id }, req.body.role);

    res.json(true)

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res, next) => {
  try {
    const permissions = req.body; 
    console.log("permissions:", permissions)

    // for (const item of permissions) {
    //   await Roles.updateOne(
    //     { 
    //       _id: item.id 
    //     },
    //     {
    //       permissions: item.permissions
    //     }
    //   )
    // }

    res.json(true)

  } catch (error) {
    console.log('ERROR OCCURED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res, next) => {
  try {
    const newRole = new Roles(req.body);
    await newRole.save();

    res.json(newRole);
    
  } catch (error) {
    console.log('ERROR OCCURED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}


// [DELETE] /admin/roles/delete/:id
module.exports.deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Roles.updateOne({ _id: id }, { 
      deleted: true,
    });

    res.send(true);

  } catch (error) {
    return next(
      new ApiError(500, error)
    );
  }
}