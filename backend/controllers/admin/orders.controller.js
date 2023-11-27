const Orders = require('../../models/orders.model');
const ApiError = require('../../helpers/api-error');

module.exports.index = async (req, res, next) => {
  try {
    const orders = await Orders.find();

    res.json({
      success: true,
      orders: orders
    })

  } catch (error) {    
    console.log('Error occurred:', error);
    return next(
      new ApiError(500, error)
    );
  }
}