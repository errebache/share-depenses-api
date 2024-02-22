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
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    expenses: { type: Schema.Types.ObjectId, ref: "expenses" },
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
  { timestamps: true } // Active les timestamps pour créer automatiquement les champs createdAt et updatedAt
);

const ListModel = mongoose.model("lists", listSchema);

module.exports = ListModel;
