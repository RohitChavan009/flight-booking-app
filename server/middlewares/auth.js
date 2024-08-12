import { User } from "../models/index.js";

import { checkToken } from "../utils/jwt.js";

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    req.user = null;

    next();
  } else {
    const token = header.split(" ")[1];

    try {
      const data = await checkToken(token);

      if (!data.payload)
        return res.status(401).json({
          message: "unauthorized",
        });

      const user = await User.findByPk(data.payload);

      req.user = user;

      next();
    } catch (error) {
      console.log("error : ", error.message);

      res.status(401).json({
        message: "unauthorized",
      });
    }
  }
};
