const express = require('express');
const multer = require('multer')

const router = express.Router()
const upload = multer();

const controller = require('../../controllers/admin/products.controller');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/products.validate");

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.get("/product-list", controller.getProductList);
router.get("/", controller.index);
router.get('/edit/:id', controller.edit);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  uploadCloud.upload,
  // validate.createPost,
  controller.editPatch
);
router.patch('/multi-change', controller.multiChange);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;