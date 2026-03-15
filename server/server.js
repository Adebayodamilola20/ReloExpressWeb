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

// --- Termii OTP Integration ---
const TERMII_API_KEY = process.env.TERMII_API_KEY || 'TLEMELooIbeYmixoGxYgjzKbOuUrLrQfFpFAGXSaYySDBKhCnddMtCoLyMBWLh';
const TERMII_SENDER_ID = 'ReloExpress';

app.post('/api/verify/send-sms', async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ error: 'Phone number is required' });
        }

        // Format phone number to start with 234 without '+' for Termii
        let rawPhone = phone.trim().replace(/\s+/g, '');
        
        // Remove '+' if present
        rawPhone = rawPhone.replace('+', '');
        
        if (rawPhone.startsWith('0')) {
            rawPhone = rawPhone.substring(1);
        }
        if (!rawPhone.startsWith('234')) {
            rawPhone = `234${rawPhone}`;
        }

        const termiiPayload = {
            api_key: TERMII_API_KEY,
            message_type: 'NUMERIC',
            to: rawPhone,
            from: TERMII_SENDER_ID,
            channel: 'generic',
            pin_attempts: 3,
            pin_time_to_live: 10,
            pin_length: 6,
            pin_placeholder: '< 1234 >',
            message_text: 'Your ReloExpress verification code is < 1234 >. Valid for 10 minutes.',
            pin_type: 'NUMERIC'
        };

        console.log('Sending Termii Request:', JSON.stringify(termiiPayload, null, 2));

        const response = await axios.post('https://api.ng.termii.com/api/sms/otp/send', termiiPayload);
        res.json(response.data);
    } catch (error) {
        console.error('Termii Send SMS Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to send verification SMS via Termii', 
            details: error.response?.data 
        });
    }
});

app.post('/api/verify/check-otp', async (req, res) => {
    try {
        const { pinId, code } = req.body;
        if (!pinId || !code) {
            return res.status(400).json({ error: 'Pin ID and code are required' });
        }

        const response = await axios.post('https://api.ng.termii.com/api/sms/otp/verify', {
            api_key: TERMII_API_KEY,
            pin_id: pinId,
            pin: code
        });

        res.json(response.data);
    } catch (error) {
        console.error('Termii Verify OTP Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to verify OTP with Termii',
            details: error.response?.data
        });
    }
});

const port = process.env.PORT || 5001;

// SPA Fallback: Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
