const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

class UserController {
  static async createUserAction(req, res, next) {
    let errors = validationResult(req);

    if (errors.errors.length) {
      return res
        .status("409")
        .json({ status: "error", errors: errors.array() });
    }

    try {
      let hashPassowrd = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
      );

      const result = await User.create({
        email: req.body.email,
        password: hashPassowrd,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
      });

      const token = await jwt.sign(
        {
          id: result.id,
          email: result.email,
          username: result.username,
        },
        process.env.JWT_SECRET
      );

      return res.status("201").json({
        status: "ok",
        message: "User created Successfully",
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
