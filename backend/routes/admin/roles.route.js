const express = require('express');
const multer = require('multer')

const router = express.Router()
const upload = multer();

const controller = require('../../controllers/admin/roles.controller');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/role.validate");

router.get("/", controller.index);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.editPatch);

router.patch("/permissions", controller.permissionsPatch);

router.post(
  "/create", 
  validate.createPost,
  controller.createPost
);

router.delete("/delete/:id", controller.deleteItem);

module.exports = router;