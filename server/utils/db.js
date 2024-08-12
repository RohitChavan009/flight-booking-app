import env from "dotenv";
import { Sequelize } from "sequelize";

env.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connected to database 🚀");
  } catch (error) {
    console.error("Database connection error : ", error);
  }
};
