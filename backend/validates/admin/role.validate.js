module.exports.createPost = async (req, res, next) => {
  if (!req.body.title) {
    res.json({
      error: true,
      message: 'Title must not be empty'
    })
    return;
  }

  if (req.body.title.length < 5) {
    res.json({
      error: true,
      message: 'Title must be at least 5 digits length'
    })
    return;
  }

  next();
}