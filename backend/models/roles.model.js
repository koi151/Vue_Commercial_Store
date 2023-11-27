const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  permissions: {
    type: Array, 
    default: []
  },
  deleted: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  deletedAt: Date,
})

const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = Role;