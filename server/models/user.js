import { DataTypes } from "sequelize";

import { sequelize } from "../utils/db.js";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 10], // length of 10 characters
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [8, Infinity], // minimum length of 8 characters
    },
  },
  role: {
    type: DataTypes.ENUM("USER", "ADMIN"),
    allowNull: false,
    defaultValue: "USER",
  },
  avatar: {
    type: DataTypes.STRING,
    required: false,
    allowNull: true,
  },
});

export { User };
