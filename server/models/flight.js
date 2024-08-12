import { DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

const Flight = sequelize.define("flight", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  airline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureAirportCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureAirportName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrivalAirportCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arrivalAirportName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.FLOAT, // Duration can be represented as a float (in hours)
    allowNull: false,
  },
  baseFare: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  totalFare: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  economySeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  businessSeats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  flightStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Flight };
