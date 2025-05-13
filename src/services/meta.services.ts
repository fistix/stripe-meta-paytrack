import axios from 'axios';
import crypto from 'crypto';

const pixelId = process.env.PIXEL_ID;
const accessToken = process.env.META_ACCESS_TOKEN;

export const sendFacebookConversion = async (
  email: string,
  amount: number,
  currency: string
): Promise<void> => {
  try {
    console.log('✅ SendFacebookConversion started');

    const hashedEmail = crypto
      .createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');

    const payload = {
      data: [
        {
          event_name: 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          user_data: {
            em: [hashedEmail],
          },
          custom_data: {
            currency,
            value: amount,
          },
          action_source: 'website',
        },
      ],
    };

    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

    const response = await axios.post(url, payload);

    console.log('📦 FB Conversion Response:', response?.data);
  } catch (error: any) {
    console.error('❌ Facebook Conversion API Error:', error?.response?.data || error?.message);
  }
};
