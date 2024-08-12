import { User } from "./user.js";
import { Flight } from "./flight.js";
import { Booking } from "./booking.js";

Booking.belongsTo(User, { foreignKey: "userId", as: "user" });

Booking.belongsTo(Flight, { foreignKey: "flightId", as: "flight" });

export { User, Flight, Booking };
