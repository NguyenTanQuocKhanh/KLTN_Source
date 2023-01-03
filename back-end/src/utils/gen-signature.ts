import { createHmac } from 'crypto';
export const sign = (dataRaw: string, secretKey: string) => {
  try {
    const signature = createHmac('sha256', secretKey)
      .update(dataRaw)
      .digest('hex');
    return signature;
  } catch (error) {
    console.log(error);
    return null;
  }
};
