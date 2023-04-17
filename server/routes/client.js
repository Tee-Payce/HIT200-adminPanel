import express from "express";
import { getMeals, getCustomers, getTransactions } from "../controllers/client.js";
import User from "../models/User.js";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();
router.get("/meals", getMeals);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);



// Register route
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      fname: req.body.fname,
      sname: req.body.sname,
      studentID: req.body.studentID,
      password: req.body.password,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ studentID: req.body.studentID });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid student ID or password" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invalid student ID or password" });
    }
    const token = jwt.sign({ studentID: user.studentID }, "secret");
    res.send({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
export default router;