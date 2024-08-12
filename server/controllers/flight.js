import { Flight } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const flights = await Flight.findAll();

    res.status(200).json({ message: "success", flights });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};

export const create = async (req, res) => {
  const {
    flightNumber,
    airline,
    duration,
    flightStatus,
    pricing,
    availability,
    departureAirport,
    arrivalAirport,
    departureDateTime,
    arrivalDateTime,
  } = req.body;

  try {
    const payload = {
      flightNumber,
      airline,
      duration,
      flightStatus,
      baseFare: pricing.baseFare,
      totalFare: pricing.totalFare,
      economySeats: availability.economy,
      businessSeats: availability.business,
      departureAirportCode: departureAirport.code,
      departureAirportName: departureAirport.name,
      arrivalAirportCode: arrivalAirport.code,
      arrivalAirportName: arrivalAirport.name,
      departureDateTime: departureDateTime,
      arrivalDateTime: arrivalDateTime,
    };

    const flight = await Flight.create(payload);

    return res.status(201).json({ message: "success", flight });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  const {
    flightNumber,
    airline,
    duration,
    flightStatus,
    pricing,
    availability,
    departureAirport,
    arrivalAirport,
    departureDateTime,
    arrivalDateTime,
  } = req.body;

  try {
    const flight = await Flight.findByPk(id);

    if (!flight) {
      return res
        .status(404)
        .json({ message: `flight with id ${id} does not exist` });
    }

    const payload = {
      flightNumber,
      airline,
      duration,
      flightStatus,
      baseFare: pricing.baseFare,
      totalFare: pricing.totalFare,
      economySeats: availability.economy,
      businessSeats: availability.business,
      departureAirportCode: departureAirport.code,
      departureAirportName: departureAirport.name,
      arrivalAirportCode: arrivalAirport.code,
      arrivalAirportName: arrivalAirport.name,
      departureDateTime,
      arrivalDateTime,
    };

    await flight.update(payload);

    return res.status(200).json({ message: "success", flight });
  } catch (error) {
    console.log("error : ", error.message);

    return res.status(500).json({ message: "something went wrong" });
  }
};
