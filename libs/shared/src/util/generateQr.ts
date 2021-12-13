import * as QRCode from 'qrcode';

export const generateQR = async (url) => {
  try {
    return await QRCode.toDataURL(url);
  } catch (err) {
    console.error(err);
  }
};
