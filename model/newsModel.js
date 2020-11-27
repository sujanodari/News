const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

var newsSchema = mongoose.Schema({
  source: {
    id: [String],
    name: { type: String }
  },
  author: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  url: { type: String, required: true },
  urlToImage: { type: String, required: false },
  verified: { type: Boolean, required: false },
  publishedAt: { type: Date, required: true }
});

newsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("news", newsSchema);
