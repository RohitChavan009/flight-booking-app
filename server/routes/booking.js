import express from "express";

import { get, create } from "../controllers/booking.js";

import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/user/get", requireAuth, get);

router.post("/create", requireAuth, create);

export default router;
