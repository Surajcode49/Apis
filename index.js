const express = require("express");
const port = 4000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // <-- Missing parentheses

mongoose
  .connect("mongodb://localhost:27017/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo is connected bro don't worry bro ");
  })
  .catch((err) => {
    console.log(err);
  });

// Define the schema for products
const productSchema = new mongoose.Schema({
  name: String, // <-- Corrected type definitions
  number: Number,
  gender: String,
});

// Create a model based on the schema
const Product = mongoose.model("Product", productSchema);

app.post("/new", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body); // <-- Use Product model to create a new product
    res.status(200).json({
      success: true,
      product: newProduct, // <-- Return the newly created product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// create a api for the read the data

app.get("/read", async (req, res) => {
  try {
      const products = await Product.find();

      res.status(200).json({
          success: true,
          products // Sending retrieved products in the response
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
});





app.listen(port, () => { // <-- Use 'port' variable instead of hardcoding port number
  console.log(`server is running bro ${port}`);
});
