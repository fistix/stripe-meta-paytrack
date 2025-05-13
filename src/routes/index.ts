import express from "express";
import stripeRoutes from "./stripe.router";

const router = express.Router();

router.use("/stripe", stripeRoutes);

export default router;