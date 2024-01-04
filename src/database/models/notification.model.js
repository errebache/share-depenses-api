const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const NotificationSchema = mongoose.model("notifications", notificationSchema);

module.exports = NotificationSchema;