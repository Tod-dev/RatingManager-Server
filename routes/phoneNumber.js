const router = require("express").Router();
const PhoneNumber = require("../models/PhoneNumber");

router.put("/:number/:rating", async (req, res) => {
  //!Create new ratings for the number or update it if alredy exist
  let num = req.params.number;
  let query = { phoneNumber: num };
  let newRate = { rating: req.params.rating, date: new Date() };
  let mes = `Handling PUT requests to /ratings/${num}/${req.params.rating}`;
  let newObj = {
    phoneNumber: num,
    ratings: [newRate],
  };

  const phoneObj = await PhoneNumber.findOne(query);
  if (!phoneObj) {
    console.log("Can't find the number! ");
    //! creo un nuovo phoneNumber
    const phonenumb = new PhoneNumber(newObj);
    phonenumb
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: mes,
          createdProduct: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    phoneObj.ratings.push(newRate);
    phoneObj
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: mes,
          createdProduct: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

router.get("/:number", async (req, res) => {
  const phoneObj = await PhoneNumber.findOne({
    phoneNumber: req.params.number,
  });
  if (!phoneObj) return res.status(400).send("Can't find the number! ");
  return res.status(200).send(phoneObj);
});

router.get("/", async (req, res) => {
  const phoneObj = await PhoneNumber.find();
  if (!phoneObj) return res.status(400).send("Can't find any number! ");
  return res.status(200).send(phoneObj);
});

module.exports = router;
