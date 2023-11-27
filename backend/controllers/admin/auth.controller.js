const bcrypt = require('bcrypt');
const Account = require('../../models/accounts.model');
const ApiError = require('../../helpers/api-error');

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res, next) => {
  try {
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;

    const user = await Account.findOne({ email: enteredEmail });

    if (!user) {
      res.json('wrong info');
      return;
    }

    const passwordMatch = await bcrypt.compare(enteredPassword, user.password);

    if (!passwordMatch) {
      res.json('wrong info');
      return;
    }

    if (user.status === 'inactive') {
      res.json('blocked');
      return;
    }

    res.cookie("token", user.token);
    res.json('success');

  } catch (error) {
    console.log('error:', error);
    return next(new ApiError(500, error));
  }
};


// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  console.log('logout')
  res.clearCookie("token");
  res.send({
    success: true
  })
}