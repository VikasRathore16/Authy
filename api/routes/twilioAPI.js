var express = require("express");
var router = express.Router();

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require("twilio")(accountSid, authToken);

router.get("/", function (req, res, next) {
  res.send("API is working properly");
});

router.post("/verify", function (req, res, next) {
  client.verify.v2
    .services(process.env.service_sid)
    .verifications.create({ to: req.body.to, channel: req.body.channel })
    .then((verification) => res.send(verification));
});

router.post("/check", function (req, res, next) {
  client.verify.v2
    .services(process.env.service_sid)
    .verificationChecks.create({ to: req.body.to, code: req.body.code })
    .then((verification_check) => res.send(verification_check));
});

module.exports = router;
