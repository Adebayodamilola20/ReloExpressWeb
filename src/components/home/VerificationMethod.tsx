import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import type { ConfirmationResult } from 'firebase/auth';
import { API_ENDPOINTS } from '../../api/config';
import './VerificationMethod.css';

declare global {
    interface Window {
        confirmationResult: ConfirmationResult;
    }
}

interface VerificationMethodProps {
    phone: string;
    onSuccess: (pinId?: string) => void;
}

const VerificationMethod: React.FC<VerificationMethodProps> = ({ phone, onSuccess }) => {
    const navigate = useNavigate();
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
            // FIREBASE CODE COMMENTED OUT
            /*
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (e) {
                    console.warn('Error clearing reCAPTCHA:', e);
                }
                (window as any).recaptchaVerifier = undefined;
            }

            const container = document.getElementById('recaptcha-container');
            if (container) {
                container.innerHTML = '';
            }

            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible'
            });

            let rawPhone = phone.trim().replace(/\s+/g, '');
            if (rawPhone.startsWith('0')) {
                rawPhone = rawPhone.substring(1);
            }
            const formattedPhone = `+234${rawPhone}`;

            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
            window.confirmationResult = confirmationResult;
            */

            // TERMII INTEGRATION
            const response = await fetch(API_ENDPOINTS.SEND_SMS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            
            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                await response.text();
                throw new Error(`Server returned non-JSON response. Ensure backend is deployed/running! Status: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send verification SMS');
            }

            console.log('Termii Send SMS Response:', data);
            
            showToast('success', 'Verification code sent to your phone!');
            setTimeout(() => onSuccess(data.pinId), 1000); // Pass pinId to OTP page
        } catch (error: any) {
            console.error('SMS Send Error:', error);
            showToast('error', error.message || 'Failed to send verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsApp = () => {
        // Bypass for now and go straight to registration
        navigate('/register', { state: { phone } });
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
                        onClick={handleWhatsApp}
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
