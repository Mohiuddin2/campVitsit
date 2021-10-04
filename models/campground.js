const mongoose = require("mongoose");
const Review = require('./review');
const Schema = mongoose.Schema;

// creating Schema
const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectID,
      ref: "Review",
    },
  ],
});
//delete middleware for deleting all review 
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if(doc) {
      await Review.deleteMany({
          _id: {
              $in: doc.reviews
          }
      })
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);