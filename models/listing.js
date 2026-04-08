const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    // ✅ Fix: String se Object banaya kyunki data.js mein {filename, url} tha
    filename: String,
    url: {
      type: String,
      default: "https://media.istockphoto.com/id/2061983079/photo/scenery-of-rice-terraces-in-ideura-at-sunset.jpg",
      set: (v) =>
        v === ""
          ? "https://media.istockphoto.com/id/2061983079/photo/scenery-of-rice-terraces-in-ideura-at-sunset.jpg"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;