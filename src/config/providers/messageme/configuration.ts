import { registerAs } from '@nestjs/config';

export default registerAs('messageme', () => ({
  apiKey: process.env.MESSAGEME_API_KEY,
  callingNumber: process.env.MESSAGEME_CALLING_NUMBER,
}));
