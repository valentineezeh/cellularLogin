import express from "express";
import path from "path";
import UserInputValidation from "../middleware/UserInputValidate";
import UserController from "../controller/UserController";
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.sendFile(path.resolve("client/index.html"));
});

// Login route
router.post(
  "/api/user/login",
  UserInputValidation.loginInputValidation,
  UserController.loginUser
);

export default router;
