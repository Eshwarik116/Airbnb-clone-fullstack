const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const ejsMate= require("ejs-mate");




main()
  .then(() => console.log(" connected to db"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



app.get("/", (req, res) => {
  res.send("hi, i am root");
});

// Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});
// New route
app.get("/listings/new", (req, res) => {
  res.render(path.join("listings", "new"));
});

// Index route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render(path.join("listings", "index"), { allListings });
});

// Show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render(path.join("listings", "show"), { listing });
});

//CREATE ROUTE == post route to get data added newly for creating new listings
app.post("/listings",async (req,res)=>{
  //let { name,description, imag e, country}= extracting all this from listings this is one way but more simpler tha n this is key vslue pair make changes in new.js and make all factors as key for eg listing[name ], listings[image] etc
 const newlisting = new Listing(req.body.listing);//parse into models 
  await newlisting.save();
  res.redirect("/listings");
});

//edit route 
app.get("/listings/:id/edit", async (req,res)=>{
   let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);

    res.redirect("/listings");
});


app.listen(8080, () => {
  console.log("🚀 server is running on port 8080");
});