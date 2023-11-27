module.exports.createPost = async (req, res, next) => {
  if (!req.body.product.title) {
    res.json({
      error: true,
      message: 'Title must not be empty'
    })
    return;
  }

  if (req.body.product.title.length < 5) {
    res.json({
      error: true,
      message: 'Title must be at least 5 digits length'
    })
    return;
  }

  if (req.body.product.position) {
    if (!/^\d+$/.test(req.body.product.position)) {
      res.json({
        error: true,
        message: 'Position must be a number'
      });
      return;
    }
  }

  next();
}