const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    description: String,
    group: {
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    image: {
      original: String,
      large: String,
      medium: String,
      small: String,
    },
    permissions: {
      read: Boolean,
      update: Boolean,
      delete: Boolean,
      image: {
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
      settles: {
        index: Boolean,
        create: Boolean,
      },
    },
  },
  { timestamps: true }
);

const ListModel = mongoose.model("lists", listSchema);

module.exports = ListModel;
