// Centralized API configuration
// This allows for easy switching between local and production environments

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001';

export const API_ENDPOINTS = {
    SEND_SMS: `${API_BASE_URL}/api/verify/send-sms`,
    CHECK_OTP: `${API_BASE_URL}/api/verify/check-otp`,
};
