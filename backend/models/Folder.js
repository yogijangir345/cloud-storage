const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  parentFolder: {
    type: String,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Folder", folderSchema);