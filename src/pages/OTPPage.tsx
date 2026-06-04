import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPVerification from '../components/home/OTPVerification';

interface LocationState {
    phone: string;
    pinId?: string;
}

const OTPPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;
    const phone = state?.phone || '';
    const pinId = state?.pinId || '';

    if (!phone) {
        navigate('/');
        return null;
    }

    if (!pinId) {
        navigate('/');
        return null;
    }

    return (
        <div className="otp-page" style={{ padding: '40px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
            <OTPVerification
                phone={phone}
                pinId={pinId}
                onVerified={() => navigate('/register')}
                onResend={() => {
                    console.log('Resending OTP to', phone);
                    // TODO: Implement proper resend logic with error handling
                }}
            />
        </div>
    );
};

export default OTPPage;