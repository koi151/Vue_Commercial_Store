const express = require('express');
const multer = require('multer')

const router = express.Router()
const upload = multer();

const controller = require('../../controllers/admin/product-categories.controller');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product-categories.validate");

// router.post(
//   '/create',
//   upload.single("thumbnail"),
//   uploadCloud.upload,
//   // validate.createPost,
//   controller.createPost
// );

router.get("/", controller.index);
router.get("/edit/:id", controller.edit);
router.get("/create", controller.create);

router.post(
  '/create',
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch(
  '/edit/:id',
  upload.single("thumbnail"),
  uploadCloud.upload,
  // validate.createPost,
  controller.editPatch
);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;