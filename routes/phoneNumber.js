const router = require("express").Router();
const PhoneNumber = require("../models/PhoneNumber");
//!regioni
const Region = require("../models/PhoneNumber");

router.put("/:number/:rating", async (req, res) => {
  //!Create new ratings for the number or update it if alredy exist
  //const number = await PhoneNumber.findById(req.params.id);
  const number = req.params.number;
  const rating = req.params.rating;
  console.log(number);
  console.log(rating);
  return res.send("nuumber logged with rating! PUT");
  // let query = { name: req.body.data.name };

  // Region.findOneAndUpdate(
  //   query,
  //   req.body.data,
  //   { upsert: true, useFindAndModify: false },
  //   (err) => {
  //     if (err) return res.send(500, { error: err });
  //     return res.send("Succesfully saved.");
  //   }
  // ).then(() => {
  //   //() => console.log("region done")
  // });
});

router.get("/:number", async (req, res) => {
  const phoneObj = await PhoneNumber.findOne({
    phoneNumber: req.params.number,
  });
  if (!phoneObj) return res.status(400).send("Can't find the number! ");
  return res.status(200).send(phoneObj);
});

module.exports = router;
