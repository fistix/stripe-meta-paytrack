import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';

// Rate limiting configuration
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    error: 'Too many requests from this IP, please try again after 15 minutes',
    timestamp: new Date().toISOString()
  }
});

// CORS configuration
export const corsOptions: cors.CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Security headers middleware
export const securityHeaders = helmet();

// Request validation middleware
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  // Add basic request validation
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(400).json({
      status: 'error',
      error: 'Content-Type must be application/json',
      timestamp: new Date().toISOString()
    });
  }
  next();
}; 