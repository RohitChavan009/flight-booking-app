import cors from "cors";
import env from "dotenv";
import express from "express";

import { connectDB, sequelize } from "./utils/db.js";

import AuthRouter from "./routes/auth.js";
import FlightRouter from "./routes/flight.js";
import BookingRouter from "./routes/booking.js";

env.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRouter);
app.use("/api/flight", FlightRouter);
app.use("/api/booking", BookingRouter);

connectDB()
  .then(() =>
    sequelize
      .sync()
      .then(() =>
        app.listen(process.env.PORT, () =>
          console.log(`server listening on port ${process.env.PORT} 😎`)
        )
      )
      .catch((error) => console.log("error : ", error))
  )
  .catch((error) => console.log("error : ", error));
