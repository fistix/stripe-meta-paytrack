import { Request, Response, Router } from "express";
import { stripeWebhookController } from "../controllers/stripe.controller";
import bodyParser from "body-parser";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send("Hello I am Stripe route")
})


router.post("/webhook", bodyParser.raw({ type: 'application/json' }), stripeWebhookController);


export default router;