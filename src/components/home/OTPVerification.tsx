import React, { useState, useRef, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';

interface OTPVerificationProps {
    phone: string;
    onVerified: () => void;
    onResend: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ phone, onVerified, onResend }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let interval: any;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit if all digits are entered
        if (newOtp.every(digit => digit !== '')) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (code: string) => {
        setLoading(true);
        setError(null);
        try {
            const confirmationResult = (window as any).confirmationResult;

            if (!confirmationResult) {
                setError('Session expired. Please try sending the code again.');
                return;
            }

            const result = await confirmationResult.confirm(code);
            console.log('User signed in successfully:', result.user);
            
            setSuccess(true);
            setTimeout(() => onVerified(), 1500);
        } catch (err: any) {
            console.error('OTP Verification Error:', err);
            let errorMessage = 'Invalid verification code. Please try again.';
            
            if (err.code === 'auth/code-expired') {
                errorMessage = 'The verification code has expired.';
            } else if (err.code === 'auth/invalid-verification-code') {
                errorMessage = 'The code entered is incorrect.';
            }

            setError(errorMessage);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResendClick = () => {
        if (timer === 0) {
            setTimer(60);
            setOtp(['', '', '', '', '', '']);
            setError(null);
            onResend();
        }
    };

    return (
        <div className="otp-wrapper">
            <button className="otp-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={24} />
            </button>
            <div className="otp-content">
                <div className="otp-header-logo">
                    <span className="logo-text">reloExpress</span>
                </div>
                <h2>Enter code</h2>
                <p className="otp-subtitle">
                    A verification code was sent to<br />
                    <strong>+234 {phone}</strong>
                </p>

                {error && (
                    <div className="otp-toast error">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="otp-toast success">
                        <CheckCircle size={18} />
                        <span>Code verified successfully!</span>
                    </div>
                )}

                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            className="otp-box"
                            disabled={loading || success}
                        />
                    ))}
                </div>

                <div className="otp-footer">
                    {loading ? (
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                            <Loader2 className="animate-spin" size={20} />
                            <span>Verifying...</span>
                        </div>
                    ) : (
                        <p className="otp-timer">
                            {timer > 0 ? (
                                <>Resend code in <strong>{timer}</strong></>
                            ) : (
                                <button className="resend-link" onClick={handleResendClick}>
                                    Resend code
                                </button>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
