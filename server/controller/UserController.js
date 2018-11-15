import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import db from "../database/models";

dotenv.config();

const { User } = db;

console.log('-->', User)
const secret = process.env.SECRET_KEY;

class UserController {
  /**
   * Register a user and return a JWT token
   * @param {*} req - Request object
   * @param {*} res - Response object
   * @param {*} next - Next function
   * @returns {token} token - JWT token
   */
  static loginUser(req, res, next) {
    const { password } = req.body;
    let { email } = req.body;
    email = email.toLowerCase();
    User.findOne({
      where: {
        email
      }
    })
      .then(user => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              {
                userId: user.id,
                email: email
              },
              secret,
              { expiresIn: "24h" }
            );
            return res.status(200).json({
              message: "Welcome User you are now logged in.",
              user: {
                email: email,
                token
              }
            });
          }
          return res.status(400).json({
            message: "Username or password does not match."
          });
        }
        return res.status(404).json({
          message: "You are yet to register. Kindly sign up."
        });
      })
      .catch(next);
  }
}

export default UserController;
