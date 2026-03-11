require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = 5001;

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Safety check for keys: if they are missing or still placeholder, use Simulation Mode
const isTwilioConfigured = accountSid && !accountSid.startsWith('AC000') && verifyServiceSid && !verifyServiceSid.startsWith('VA000');

// Only initialize Twilio client if keys look real
let client = null;
if (isTwilioConfigured) {
    try {
        client = twilio(accountSid, authToken);
    } catch (e) {
        console.error('Failed to initialize Twilio client:', e.message);
    }
}

/**
 * Handle +234 country code for Nigeria
 */
const formatPhoneNumber = (phone) => {
    let formatted = phone.trim().replace(/\s+/g, '');
    if (formatted.startsWith('0')) {
        formatted = '+234' + formatted.substring(1);
    } else if (!formatted.startsWith('+')) {
        formatted = '+234' + formatted;
    }
    return formatted;
};

// SMS Verification Endpoint
app.post('/api/verify/send-sms', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);

    // If not configured, print to terminal and return success (SIMULATION)
    if (!isTwilioConfigured || !client) {
        console.log(`\n================================`);
        console.log(`[SIMULATION MODE ACTIVE]`);
        console.log(`To: ${formattedPhone}`);
        console.log(`Code: 123456`);
        console.log(`Note: No real SMS sent because keys are missing in .env`);
        console.log(`================================\n`);

        return res.status(200).json({
            success: true,
            message: '(SIMULATION) Code sent to terminal! Use 123456.'
        });
    }

    try {
        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: formattedPhone, channel: 'sms' });

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully via SMS',
            sid: verification.sid
        });
    } catch (error) {
        console.error('Twilio SMS Error:', error);
        res.status(500).json({
            success: false,
            message: 'Twilio error: ' + error.message
        });
    }
});

// Check OTP Endpoint
app.post('/api/verify/check-otp', async (req, res) => {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
        return res.status(400).json({ success: false, message: 'Phone number and code are required' });
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);

    // Simulation Mode Logic
    if (!isTwilioConfigured || !client) {
        if (code === '123456') {
            return res.status(200).json({ success: true, message: 'Verification successful!' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid verification code.' });
        }
    }

    try {
        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: formattedPhone, code: code });

        if (verificationCheck.status === 'approved') {
            res.status(200).json({ success: true, message: 'Verification successful!' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid verification code.' });
        }
    } catch (error) {
        console.error('Twilio Verify Check Error:', error);
        res.status(500).json({
            success: false,
            message: 'Verification check failed: ' + error.message
        });
    }
});

// WhatsApp Verification Endpoint
app.post('/api/verify/send-whatsapp', (req, res) => {
    res.status(200).json({
        success: false,
        message: 'WhatsApp verification is currently under development.'
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    if (!isTwilioConfigured) {
        console.log(`⚠️  Running in SIMULATION MODE. Edit server/.env to enable real SMS.`);
    }
});
