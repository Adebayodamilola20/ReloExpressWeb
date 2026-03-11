import React, { useState } from 'react';
import { MessageCircle, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { API_ENDPOINTS, API_BASE_URL } from '../../api/config';
import './VerificationMethod.css';

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
        console.log('Sending SMS to:', phone, 'via:', API_ENDPOINTS.SEND_SMS);

        try {
            const response = await fetch(API_ENDPOINTS.SEND_SMS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: phone }),
            });

            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    showToast('error', errorData.message || 'Server error occurred.');
                    setLoading(false);
                    return;
                } catch (e) {
                    throw new Error(`Server responded with ${response.status}`);
                }
            }

            const data = await response.json();

            if (data.success && data.message === 'Successfully Sent') {
                showToast('success', 'Verification code sent to your phone!');
                setTimeout(() => onSuccess(), 1000); // Navigate to OTP screen
            } else {
                showToast('error', data.message || 'Failed to send verification code.');
            }
        } catch (error) {
            console.error('SMS Error details:', error);
            showToast('error', `Connection error. Please check if the server is running at: ${API_BASE_URL}`);
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
            </div>
        </div>
    );
};

export default VerificationMethod;
