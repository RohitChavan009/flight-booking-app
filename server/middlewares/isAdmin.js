export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "unauthorized",
    });
  }

  if (req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
};
