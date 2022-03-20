const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const userController = require("../controller/user");
const User = require("../models/user");

router.post(
  "/",
  [
    body("username")
      .isLength({ min: 5, max: 16 })
      .withMessage("Username Must be min of 5 chars and max of 16 chars")
      .custom((value) => {
        return User.findOne({
          where: {
            username: value,
          },
        }).then((result) => {
          if (result) return Promise.reject("Username Already Exists");
        });
      }),
    body("email", "Email mut be valid")
      .isEmail()
      .custom((value) => {
        return User.findOne({
          where: {
            email: value,
          },
        }).then((result) => {
          if (result) return Promise.reject("Email Already Exists");
        });
      }),
    body(
      "password",
      "Passowrd Must Contain Min 8 Character With One UpperCase, LowerCase character and one digit"
    ).custom((value) => {
      if (
        !value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
        )
      ) {
        throw new Error();
      }

      return true;
    }),
  ],
  userController.createUserAction
);

// router.get("/:userId", authController.getPosts);

module.exports = router;
