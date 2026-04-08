const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); // ✅ Fix 1: ../ added
// ✅ Fix 2: const app = require("./app") hata diya (unnecessary tha)

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(async () => {
    console.log("✅ connected to db");
    await initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  console.log("initDB called");

  await Listing.deleteMany({});
  console.log("deleted old data");

  await Listing.insertMany(initData.data);
  console.log("🚀 data was initialized");
};