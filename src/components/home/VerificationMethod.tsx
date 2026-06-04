import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, MessageCircle, Send } from 'lucide-react';
import { API_ENDPOINTS } from '../../api/config';
import './VerificationMethod.css';

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
            const response = await fetch(API_ENDPOINTS.SEND_SMS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone })
            });
            
            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
                if (!data || typeof data !== 'object') {
                    throw new Error("Invalid response format from server");
                }
            } else {
                throw new Error("Server returned non-JSON response: " + (await response.text()));
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send verification SMS');
            }

            if (process.env.NODE_ENV === 'development') {
                console.log('Termii Send SMS Response:', data);
            }

            if (!data.pinId) {
                throw new Error('Missing pinId in response');
            }

            showToast('success', 'Verification code sent to your phone!');
            setTimeout(() => onSuccess(data.pinId), 1000);
        } catch (error: any) {
            console.error('SMS Send Error:', error);
            showToast('error', error.message || 'Failed to send verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsApp = () => {
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
            </div>
        </div>
    );
};

export default VerificationMethod;