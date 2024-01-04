const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const photoSchema = mongoose.Schema({
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'groups' },
    createdAt: { type: Date, default: Date.now }
});


const PhotoModel = mongoose.model("photos", photoSchema);

module.exports = PhotoModel;
