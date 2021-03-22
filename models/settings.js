const mongoose = require("mongoose");
const settingsSchema = mongoose.Schema({
    chatid: Number,
    name: String,
    description: String,
    img: String
}, {
    versionKey: false
})
module.exports = mongoose.model("setting", settingsSchema);