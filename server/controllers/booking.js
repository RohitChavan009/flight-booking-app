import { User, Flight, Booking } from "../models/index.js";

export const get = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const bookings = await Booking.findAll({
      where: { userId },
      include: [
        {
          model: Flight,
          as: "flight",
        },
      ],
    });

    res.status(200).json({ message: "success", bookings });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};

export const create = async (req, res) => {
  const { flightId, economy, business } = req.body;

  const { id: userId } = req.user;

  try {
    const flight = await Flight.findByPk(flightId);

    if (!flight) {
      return res
        .status(404)
        .json({ message: `flight with id ${id} does not exist` });
    }

    if (economy > flight.economySeats || business > flight.businessSeats) {
      return res.status(400).json({
        message: `no seats available for the flight with id ${flightId}`,
      });
    }

    await flight.update({
      economySeats: flight.economySeats - economy,
      businessSeats: flight.businessSeats - business,
    });

    const bookings = await Promise.all(
      [
        economy > 0 &&
          Booking.create({
            userId,
            flightId,
            seatClass: "ECONOMY",
            numberOfSeats: economy,
          }),

        business > 0 &&
          Booking.create({
            userId,
            flightId,
            seatClass: "BUSINESS",
            numberOfSeats: business,
          }),
      ].filter(Boolean)
    );

    res.status(201).json({ message: "success", data: bookings });
  } catch (error) {
    console.log("error : ", error.message);

    res.status(500).json({ message: "something went wrong" });
  }
};
