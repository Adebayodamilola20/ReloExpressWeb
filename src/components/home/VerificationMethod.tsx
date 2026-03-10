import React from 'react';
import { MessageCircle, Send } from 'lucide-react';
import './VerificationMethod.css';

interface VerificationMethodProps {
    phone: string;
}

const VerificationMethod: React.FC<VerificationMethodProps> = ({ phone }) => {
    return (
        <div className="verification-method-wrap">
            <div className="verification-content">
                <img src="/logo.svg" alt="reloExpress" className="verification-logo" />
                <h2>Choose the verification method</h2>
                <p className="verification-subtitle">
                    Verification code will be sent to:<br />
                    <strong>+234{phone}</strong>
                </p>

                <div className="verification-buttons">
                    <button className="verification-btn sms">
                        <MessageCircle size={20} className="btn-icon" />
                        <span>Get code via SMS</span>
                    </button>
                    <button className="verification-btn whatsapp">
                        <Send size={20} className="btn-icon" />
                        <span>Get code via WhatsApp</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationMethod;
