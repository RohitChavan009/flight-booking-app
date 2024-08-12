import { DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

import { User, Flight } from "./index.js";

const Booking = sequelize.define("booking", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  flightId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Flight,
      key: "id",
    },
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  seatClass: {
    type: DataTypes.ENUM("ECONOMY", "BUSINESS"),
    allowNull: false,
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
});

export { Booking };
