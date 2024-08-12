import env from "dotenv";
import JWT from "jsonwebtoken";

env.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
const JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;

export const generateAccessToken = (payload) =>
  new Promise((resolve, reject) => {
    JWT.sign(
      {
        payload,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_ACCESS_TOKEN_TTL,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }

        resolve(token);
      }
    );
  });

export const generateRefreshToken = (payload) =>
  new Promise((resolve, reject) => {
    JWT.sign(
      {
        payload,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_REFRESH_TOKEN_TTL,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }

        resolve(token);
      }
    );
  });

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        return reject(error);
      }

      resolve(decoded);
    });
  });
};
