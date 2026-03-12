import React, { useState } from 'react';
import { MessageCircle, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { auth } from '@/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import './VerificationMethod.css';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
        confirmationResult: ConfirmationResult;
    }
}

interface VerificationMethodProps {
    phone: string;
    onSuccess: () => void;
}

const VerificationMethod: React.FC<VerificationMethodProps> = ({ phone, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

    const showToast = (type: 'success' | 'error' | 'info', message: string) => {
        setStatus({ type, message });
        setTimeout(() => setStatus(null), 5000);
    };

    const handleSendSMS = async () => {
        setLoading(true);
        setStatus(null);

        try {
            // Setup reCAPTCHA
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': () => {
                        console.log('reCAPTCHA resolved');
                    }
                });
            }

            let rawPhone = phone.trim().replace(/\s+/g, '');
            if (rawPhone.startsWith('0')) {
                rawPhone = rawPhone.substring(1);
            }
            const formattedPhone = `+234${rawPhone}`;
            console.log('Sending SMS to:', formattedPhone);

            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
            window.confirmationResult = confirmationResult;

            showToast('success', 'Verification code sent to your phone!');
            setTimeout(() => onSuccess(), 1000);
        } catch (error: any) {
            console.error('Firebase SMS Error:', error);
            let errorMessage = 'Failed to send verification code. Please try again.';

            if (error.code === 'auth/invalid-phone-number') {
                errorMessage = 'The phone number provided is invalid.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many requests. Please try again later.';
            } else {
                errorMessage = `Error (${error.code || 'unknown'}): ${error.message || 'Failed to send code.'}`;
            }

            showToast('error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSendWhatsApp = () => {
        showToast('info', 'WhatsApp verification is currently under development.');
    };

    return (
        <div className="verification-method-wrap">
            <div className="verification-content">
                <div className="otp-header-logo">
                    <span className="logo-text">reloExpress</span>
                </div>
                <h2>Choose the verification method</h2>
                <p className="verification-subtitle">
                    Verification code will be sent to:<br />
                    <strong>+234 {phone}</strong>
                </p>

                {status && (
                    <div className={`verification-toast ${status.type}`}>
                        {status.type === 'success' && <CheckCircle size={18} />}
                        {status.type === 'error' && <AlertCircle size={18} />}
                        {status.type === 'info' && <AlertCircle size={18} />}
                        <span>{status.message}</span>
                    </div>
                )}

                <div className="verification-buttons">
                    <button
                        className="bolt-verify-btn sms"
                        onClick={handleSendSMS}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 size={24} className="animate-spin" />
                        ) : (
                            <>
                                <MessageCircle size={24} />
                                <span>Get code via SMS</span>
                            </>
                        )}
                    </button>
                    <button
                        className="bolt-verify-btn whatsapp"
                        onClick={handleSendWhatsApp}
                        disabled={loading}
                    >
                        <Send size={24} />
                        <span>Get code via WhatsApp</span>
                    </button>
                </div>
                <div id="recaptcha-container"></div>
            </div>
        </div>
    );
};

export default VerificationMethod;
