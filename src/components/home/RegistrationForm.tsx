import React, { useState } from 'react';
import VerificationMethod from './VerificationMethod';
import './RegistrationForm.css';

const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City'];

const RegistrationForm: React.FC = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('Lagos');
    const [agreed, setAgreed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !phone || !city) {
            setError('Please fill in all fields');
            return;
        }

        if (!agreed) {
            setError('Please agree to the Terms and Conditions');
            return;
        }

        // Simulating form submission
        console.log('Form submitted:', { email, phone, city });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return <VerificationMethod phone={phone} />;
    }

    return (
        <div className="reg-form-wrap">
            <form className="reg-form" onSubmit={handleSubmit}>
                <h2>Become a delivery partner</h2>

                {error && <div className="form-error">{error}</div>}

                <div className="field-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="field-group">
                    <label htmlFor="phone">Phone number</label>
                    <div className="phone-row">
                        <div className="phone-prefix">
                            <span className="flag">🇳🇬</span>
                            <span className="code">+234</span>
                            <span className="caret">▾</span>
                        </div>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Mobile number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field-group">
                    <label htmlFor="city">City</label>
                    <div className="select-wrap">
                        <select
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <span className="select-clear" onClick={() => setCity('')}>✕</span>
                        <span className="select-arrow">▾</span>
                    </div>
                </div>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                        By registering, you agree to our <a href="#">Terms of Service</a> and{' '}
                        <a href="#">Privacy Policy</a>, commit to comply with obligations under local legislation
                        and provide only legal services and content on the reloExpress Platform.
                    </span>
                </label>

                <button type="submit" className="reg-submit-btn">
                    Register as a delivery partner
                </button>

                <p className="login-line">
                    Already have an account? <a href="#">Log in ↗</a>
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;
