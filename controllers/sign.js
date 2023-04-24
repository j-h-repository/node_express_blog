import User from "../models/user";
import { hashPassword, comparePassword } from "../rotation/pw";
const jwt = require("jsonwebtoken")

export const signUp = async (req, res) => {
  const { one, three } = req.body;
  const password = one;
  const username = three;
  console.log("creating new user");
  if (!username) return res.json({ error: "Please enter your username" });
  if (!password || password.length < 8)
    return res.json({
      error: "password required and must be greater than 8 characters",
    });

  const exist = await User.findOne({ username });
  if (exist) return res.json({ error: "username is already in use" });

  const hashedPassword = await hashPassword(password);
  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
    console.log("registered user=> ", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("registration failed: ", err);
    return res.json({ error: "Error. Registration failed. Try again." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { one, two } = req.body;
    const username = one;
    const password = two;

    //check if email exists in db//
    const user = await User.findOne({ username });
    if (!user) return res.json({"error":"no user found"});

    //compare the password using the function from the rotate.js file//
    const match = await comparePassword(password, user.password);
    if (!match) res.json({"error":"password or username is not correct"});

    //assign json web token//
    const token = jwt.sign({_id: user._id} , process.env.JWT_SECRET, {expiresIn: 60*10});

    //hide password and secret
    user.password = undefined;
    res.json({ user, token });
  } catch (err) {
    console.log(err);
  }
};
