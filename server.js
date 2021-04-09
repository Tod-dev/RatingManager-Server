//! Importing packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//!import routes
const phoneNumber = require("./routes/phoneNumber");
const { unknownEndpoint } = require("./routes/default");

//!configuration
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//!mongoDB connection
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);
//!Route Middlewares
app.use("/ratings", phoneNumber);
app.use(unknownEndpoint);

//!Server listening
app.listen(process.env.PORT, () =>
  console.log("Server started on port " + process.env.PORT)
);
