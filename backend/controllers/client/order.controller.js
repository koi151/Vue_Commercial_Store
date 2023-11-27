const Orders = require('../../models/orders.model');
const ApiError = require('../../helpers/api-error');


// [POST] /create-order
module.exports.orderPost = async (req, res) => {
  try {
    const orderObj = {
      customerInfo: req.body.customerInfo,
      cart: req.body.cartItems
    }

    const newOrder = new Orders(orderObj); 
    await newOrder.save();

    res.json({
      success: true,
    })

  } catch (error) {
    console.log('ERROR OCCURRED:', error);
    return next(
      new ApiError(500, error)
    );
  }
}