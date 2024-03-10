const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    description: String,
    size: String,
    condition: String
})

const ItemModel = mongoose.model("items", ItemSchema)

module.exports = ItemModel