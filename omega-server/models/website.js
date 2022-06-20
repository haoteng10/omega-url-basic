const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const websiteSchema = new Schema({
    name: String,
    slug: String,
    url: String,
    authorId: String
});

module.exports = model("Website", websiteSchema);