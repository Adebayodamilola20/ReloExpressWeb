require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();

// Basic Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(cors());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Health Check & API Status
app.get('/api/health', (req, res) => res.status(200).json({ status: 'ok', timestamp: new Date() }));

const port = process.env.PORT || 5001;

// Termii Configuration
const termiiApiKey = process.env.TERMII_API_KEY;
const termiiSenderId = process.env.TERMII_SENDER_ID || 'ReloExpress';
const termiiBaseUrl = 'https://api.ng.termii.com/api';

// Safety check for keys
const isTermiiConfigured = termiiApiKey && termiiApiKey.length > 10;

// In-memory store for OTPs (Key: phoneNumber, Value: { code, expires })
const otpStore = {};

/**
 * Handle +234 country code for Nigeria
 */
const formatPhoneNumber = (phone) => {
    let formatted = phone.trim().replace(/\s+/g, '');
    if (formatted.startsWith('0')) {
        formatted = '234' + formatted.substring(1);
    } else if (formatted.startsWith('+')) {
        formatted = formatted.substring(1);
    }
    return formatted;
};

// SMS Verification Endpoint (Send OTP)
app.post('/api/verify/send-sms', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Generate 6-digit random code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store in memory with 10-minute expiry
    otpStore[formattedPhone] = {
        code: generatedCode,
        expires: Date.now() + 10 * 60 * 1000
    };

    // Simulation Mode
    if (!isTermiiConfigured) {
        console.log(`\n================================`);
        console.log(`[TERMII SIMULATION MODE ACTIVE]`);
        console.log(`To: ${formattedPhone}`);
        console.log(`Code: ${generatedCode}`);
        console.log(`Note: No real SMS sent because TERMII_API_KEY is missing in .env`);
        console.log(`================================\n`);

        return res.status(200).json({
            success: true,
            message: 'Successfully Sent',
            debug: '(SIMULATION) Code sent to terminal!'
        });
    }

    try {
        // Use Termii Plain SMS API with Generic Channel
        const response = await axios.post(`${termiiBaseUrl}/sms/send`, {
            api_key: termiiApiKey,
            to: formattedPhone,
            from: termiiSenderId,
            sms: `reloExpress: Your verification code is ${generatedCode}. Valid for 10 minutes. Do not share.`,
            type: 'plain',
            channel: 'generic'
        });

        console.log('Termii Send Response:', response.data);

        res.status(200).json({
            success: true,
            message: 'Successfully Sent',
            data: response.data
        });
    } catch (error) {
        console.error('Termii SMS Error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Termii error: ' + (error.response?.data?.message || error.message)
        });
    }
});

// Check OTP Endpoint (Verify OTP)
app.post('/api/verify/check-otp', async (req, res) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: 'Phone number and verification code are required' });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    const storedData = otpStore[formattedPhone];

    if (!storedData) {
        return res.status(400).json({ success: false, message: 'No OTP record found for this number.' });
    }

    if (Date.now() > storedData.expires) {
        delete otpStore[formattedPhone];
        return res.status(400).json({ success: false, message: 'OTP has expired.' });
    }

    if (storedData.code === code) {
        delete otpStore[formattedPhone]; 
        return res.status(200).json({ success: true, message: 'Verification successful!' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid verification code.' });
    }
});

// WhatsApp Verification Endpoint (Placeholder)
app.post('/api/verify/send-whatsapp', (req, res) => {
    res.status(200).json({
        success: false,
        message: 'WhatsApp verification is currently under development.'
    });
});

// Check Configuration on Startup
console.log('--- Server Configuration ---');
console.log('Port:', port);
console.log('Termii API Key present:', !!termiiApiKey);
console.log('Termii Sender ID:', termiiSenderId);
console.log('Is Termii Configured:', isTermiiConfigured);
console.log('---------------------------');

// SPA Fallback: Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
    if (!isTermiiConfigured) {
        console.log(`⚠️  Running in TERMII SIMULATION MODE. Use code 123456.`);
    }
});
