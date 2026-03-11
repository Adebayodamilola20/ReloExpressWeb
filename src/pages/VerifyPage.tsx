import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VerificationMethod from '../components/home/VerificationMethod';

const VerifyPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const phone = location.state?.phone || '';

    if (!phone) {
        navigate('/');
        return null;
    }

    return (
        <div className="verify-page" style={{ padding: '40px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
            <VerificationMethod
                phone={phone}
                onSuccess={() => navigate('/otp', { state: { phone } })}
            />
        </div>
    );
};

export default VerifyPage;
