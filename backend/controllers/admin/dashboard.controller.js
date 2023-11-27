const ApiError = require('../../helpers/api-error');

// [GET] /admin/dashboard
module.exports.index = (req, res) => {
  res.send("OK")
  // res.render("admin/pages/dashboard/dashboard.pug", {
  //   pageTitle: 'DashBoard'
  // })
}