import bcrypt from "bcrypt";

import { User } from "../models/index.js";

import { hashPassword } from "../utils/common.js";

import { generateAccessToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ where: { mobileNumber } });

    if (!user)
      return res.status(404).json({
        message: `user with ${mobileNumber} mobile number does not exist`,
      });

    const result = await bcrypt.compare(password, user.password);

    if (!result)
      return res.status(401).json({
        message: `invalid credentials`,
      });

    const token = await generateAccessToken(user.id);

    return res.status(200).json({ message: "success", user, token });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { name, mobileNumber, password } = req.body;

  console.log(req.body);

  try {
    const existingUser = await User.findOne({ where: { mobileNumber } });

    if (existingUser)
      return res.status(404).json({
        message: `user with ${mobileNumber} mobile number already exist`,
      });

    const payload = {
      name,
      mobileNumber,
    };

    if (password || password !== null || password !== undefined) {
      const hash = await hashPassword(password);

      payload.password = hash;
    }

    const user = await User.create(payload);

    const token = await generateAccessToken(user.id);

    return res.status(201).json({ message: "success", user, token });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};
