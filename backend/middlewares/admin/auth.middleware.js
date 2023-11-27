const Account = require('../../models/accounts.model');
const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system")

module.exports.authRequire = async (req, res, next) => {

  if (!req.cookies.token) {
    return res.redirect('http://localhost:3001/admin/auth/login');
  }

  const user = await Account.findOne({
    token: req.cookies.token
  })

  if (!user) {
    if (req.cookies.token) {
      res.clearCookie("token");
      return res.redirect('http:/localhost:3001/admin/auth/login');
    }
    return res.redirect('http:/localhost:3001/admin/auth/login');
  }

  const role = await Role.findOne({
    _id: user.role_id
  }).select("title permissions")

  res.locals.user = user;
  res.locals.role = role;
  next();
}