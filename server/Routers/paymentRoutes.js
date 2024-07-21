const express = require("express");
const {
  checkout,
  paymentVerification,
} = require("../Controllers/paymentController.js");

const router = express.Router();

router.post("/checkout", checkout);
router.post("/paymentverification", paymentVerification);

module.exports = router;
