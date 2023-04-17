import User from "../models/User.js";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res, next) => {
  try {
    const { studentID, password } = req.body;

    const user = await User.findOne({ studentID });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ studentID: user.studentID }, "theboysareback");
        return res.json({ token });
      }
      const error = new Error(`Password does not match studentID ${studentID}`);
      error.statusCode = 401;
      throw error;
    }
    const error = new Error(`This studentId ${studentID} does not exist`);
    error.statusCode = 401;
    throw error;
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { fname, sname, studentID, password } = req.body;

    console.log(req.body);

    if (await User.findOne({ studentID })) {
      const error = new Error(
        `An account with the mail ${studentID} already exists`
      );
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fname,
      sname,
      studentID,
      password: hashedPassword,
    });
    const result = await user.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};
