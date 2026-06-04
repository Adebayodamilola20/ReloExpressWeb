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

    const handleSuccess = (pinId: string) => {
        try {
            if (phone && pinId) {
                navigate('/otp', { state: { phone, pinId } });
            }
        } catch (error) {
            console.error('Navigation failed:', error);
        }
    };

    return (
        <div className="verify-page" style={{ padding: '40px 20px', minHeight: '100vh', background: '#f8f9fa' }}>
            <VerificationMethod
                phone={phone}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default VerifyPage;