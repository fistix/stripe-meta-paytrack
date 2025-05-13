import { Request, Response } from "express";
import { sendFacebookConversion } from "../services/meta.services";


export const sendMetaConversion = async (req: Request, res: Response) => {
  try {
    console.log('✅ SendFacebookConversion started');
    const data = req?.body;
    console.log('📦 FB Conversion Payload:', data);
    await sendFacebookConversion(data?.customer_email || '', (data?.amount_total || 0) / 100, data?.currency || 'usd');
    console.log('📦 FB Conversion Payload:');
    res.send({ message: 'Facebook Conversion API called successfully' });
  } catch (error) {
    console.error('❌ Facebook Conversion API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}