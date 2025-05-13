import { Router } from "express";
import { sendMetaConversion } from "../controllers/meta.controllers";

const router = Router();


router.post("/pixel/conversion/event/purchased", sendMetaConversion)


export default router;