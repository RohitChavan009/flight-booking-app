import express from "express";

import { getAll, create, update } from "../controllers/flight.js";

const router = express.Router();

router.get("/get", getAll);

router.post("/create", create);

router.patch("/update/:id", update);

export default router;
