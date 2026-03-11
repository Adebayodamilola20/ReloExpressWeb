import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPVerification from '../components/home/OTPVerification';

const OTPPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phone || '';

    if (!phone) {
        navigate('/');
        return null;
    }

    return (
        <div className="otp-page" style={{ padding: '40px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
            <OTPVerification
                phone={phone}
                onVerified={() => navigate('/register')}
                onResend={() => console.log('Resending to', phone)}
            />
        </div>
    );
};

export default OTPPage;
