const OTP = require('../models/OTP.model');
const logger = require('./logger');

// Generate random OTP
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return otp;
};

// Create and save OTP
const createOTP = async (phoneNumber, purpose = 'login') => {
  // Delete any existing OTPs for this phone number and purpose
  await OTP.deleteMany({ phoneNumber, purpose, verified: false });
  
  const otpCode = generateOTP(6);
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  
  const otp = await OTP.create({
    phoneNumber,
    otp: otpCode,
    purpose,
    expiresAt: new Date(Date.now() + expiryMinutes * 60 * 1000)
  });
  
  return { otpCode, otpId: otp._id, expiresAt: otp.expiresAt };
};

// Verify OTP
const verifyOTP = async (phoneNumber, otpCode, purpose = 'login') => {
  const otp = await OTP.findOne({
    phoneNumber,
    purpose,
    verified: false
  }).sort({ createdAt: -1 }); // Get the most recent OTP
  
  if (!otp) {
    throw new Error('OTP not found or already verified');
  }
  
  const isValid = await otp.verify(otpCode);
  
  if (!isValid) {
    throw new Error('Invalid OTP');
  }
  
  return true;
};

// Send OTP via SMS (integration with Twilio or other SMS service)
const sendOTPViaSMS = async (phoneNumber, otpCode) => {
  // In development, just log the OTP
  if (process.env.NODE_ENV === 'development') {
    logger.info(`OTP for ${phoneNumber}: ${otpCode}`);
    return { success: true, message: 'OTP logged (development mode)' };
  }
  
  // In production, integrate with Twilio or other SMS service
  try {
    // Example Twilio integration:
    // const twilioClient = require('twilio')(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN
    // );
    // 
    // await twilioClient.messages.create({
    //   body: `Your EasyROAD verification code is: ${otpCode}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneNumber
    // });
    
    logger.info(`OTP sent to ${phoneNumber}`);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    logger.error(`Failed to send OTP to ${phoneNumber}: ${error.message}`);
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  generateOTP,
  createOTP,
  verifyOTP,
  sendOTPViaSMS
};
