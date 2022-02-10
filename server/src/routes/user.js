const express = require("express");
const bcrypt = require("bcryptjs");
const { requireAuth } = require("/src/middleware/auth");
const { User } = require("/src/database/schemas");

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
   res.send({
      message: "User info successfully retreived",
      user: req.user.toResponseObject(),
   });
});

router.put("/password", requireAuth, (req, res) => {
   const { oldPassword, newPassword } = req.body;

   if (req.user.validPassword(oldPassword)) {
      bcrypt.genSalt(10, (err, salt) => {
         if (err) {
            res.status(400).send({ err, message: "Error updating password" });
         }
         bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) {
               res.status(400).send({ err, message: "Error updating password" });
            }
            User.findByIdAndUpdate({ _id: req.user._id }, { password: hash }, (err) => {
               if (err) {
                  res.status(400).send({ err, message: "Error updating password" });
               }
               res.status(200).send({ message: "Password successfully updated" });
            });
         });
      });
   } else {
      res.status(400).send({ message: "Old password did not match" });
   }
});

module.exports = router;
