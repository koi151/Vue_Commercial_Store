module.exports.productsNewPrice = (products) => {
  const newProducts = products.map(item => {
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.newPrice = (item.price * ((100 - item.discountPercentage) / 100)).toFixed();
    return newItem;
  });

  return newProducts;
}


module.exports.productNewPrice = (product) => {
  const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
  return priceNew;
}