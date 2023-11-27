module.exports.createPost = async (req, res, next) => {
  if (!req.body.account.fullName) {
    res.json({
      error: true,
      message: 'Name must not be empty'
    })
    return;
  }

  if (req.body.account.fullName.length < 5) {
    res.json({
      error: true,
      message: 'Name must be at least 5 digits length'
    })
    return;
  }

  if (!req.body.account.email) {
    res.json({
      error: true,
      message: 'Email must not be empty'
    })
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.account.email)) {
    res.json({
      error: true,
      message: 'Invalid email format'
    });
    return;
  }

  if (!req.body.account.password) {
    res.json({
      error: true,
      message: 'Password must not be empty'
    })
    return;
  }

  if (req.body.account.password.length < 5) {
    res.json({
      error: true,
      message: 'Password must be at least 6 digits length'
    })
    return;
  }

  next();
}