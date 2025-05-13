import express from "express";
import stripeRoutes from "./stripe.router";
import metaRoutes from "./meta.routes";
import { corsOptions, rateLimiter, securityHeaders, validateRequest } from "../middleware/security.middleware";
import { errorHandler, notFoundHandler } from "../middleware/error.middleware";
import cors from "cors";

const router = express.Router();

/**
 * @route /api/v1
 * @desc Main API router
 * @access Public
 */

// Apply security middleware
// router.use(cors(corsOptions));
router.use(securityHeaders);
router.use(rateLimiter);
router.use(validateRequest);

// API Routes
router.use("/api/v1/stripe", stripeRoutes);
router.use("/api/v1/meta", metaRoutes);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;