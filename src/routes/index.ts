import express from "express";
import stripeRoutes from "./stripe.router";
import metaRoutes from "./meta.routes";

const router = express.Router();

router.use("/stripe", stripeRoutes);
router.use("/meta", metaRoutes)

export default router;