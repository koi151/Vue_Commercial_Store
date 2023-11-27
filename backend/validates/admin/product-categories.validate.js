module.exports.createPost = async (req, res, next) => {
  if (!req.body.category.title) {
    res.json({
      error: true,
      message: 'Title must not be empty'
    })
    return;
  }

  if (req.body.category.title.length < 5) {
    res.json({
      error: true,
      message: 'Title must be at least 5 digits length'
    })
    return;
  }

  if (req.body.category.position) {
    if (!/^\d+$/.test(req.body.category.position)) {
      res.json({
        error: true,
        message: 'Position must be a number'
      });
      return;
    }
  }

  next();
}