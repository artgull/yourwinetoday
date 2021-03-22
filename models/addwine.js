const mongoose = require("mongoose");
const wineSchema = mongoose.Schema({
    chatid: Number,
    name: String,
    description: String,
    img: String
}, {
    versionKey: false
})
module.exports = mongoose.model("winecatalog", wineSchema);