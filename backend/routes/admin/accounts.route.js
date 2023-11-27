const express = require('express');
const multer = require('multer')

const router = express.Router()
const upload = multer();

const controller = require('../../controllers/admin/accounts.controller');
const uploadCloud  = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");

router.get("/", controller.index);
router.get("/edit/:id", controller.edit);

router.post(
  '/create',
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch(
  '/edit/:id',
  upload.single("avatar"),
  uploadCloud.upload,
  // validate.createPost,
  controller.editPatch
);

router.delete('/delete/:id', controller.deleteItem);

module.exports = router;