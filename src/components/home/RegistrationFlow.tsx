import React, { useState, useEffect } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../api/config';
import './RegistrationFlow.css';

const RegistrationFlow: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        partnerType: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        referralCode: '',
        licenseNumber: '',
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Pre-warm the backend (Render cold start)
        fetch(API_BASE_URL).catch(() => { });
    }, []);

    const validateStep = () => {
        const newErrors: string[] = [];
        if (step === 1) {
            if (!formData.partnerType) newErrors.push('partnerType');
            if (!formData.firstName) newErrors.push('firstName');
            if (!formData.lastName) newErrors.push('lastName');
            if (!formData.dob) newErrors.push('dob');
            if (!formData.gender) newErrors.push('gender');
        } else if (step === 2) {
            if (!formData.licenseNumber) newErrors.push('licenseNumber');
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleNext = async () => {
        if (validateStep()) {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false);
            if (step < 4) {
                setStep(step + 1);
                setErrors([]);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            setErrors([]);
        }
    };

    const renderStep1 = () => (
        <div className="reg-form-section">
            <div className="success-alert-bolt">
                <div className="success-icon-wrap">
                    <CheckCircle size={20} />
                </div>
                <div className="alert-text">
                    <p><strong>Your account has been created</strong></p>
                    <p>You can continue registration right here or in the reloExpress mobile app. Simply use your phone number or email to log in.</p>
                </div>
            </div>

            <h2 className="section-title">Personal Information</h2>
            <p className="section-subtitle">Only your first name and vehicle details are visible to clients during the booking</p>

            <div className={`form-group ${errors.includes('partnerType') ? 'has-error' : ''}`}>
                <label>I want to join reloExpress as: <span>*</span></label>
                <select className="select-field" value={formData.partnerType} onChange={(e) => { setFormData({ ...formData, partnerType: e.target.value }); setErrors(errors.filter(e => e !== 'partnerType')); }}>
                    <option value="">Select option</option>
                    <option value="courier">Car driver</option>
                    <option value="motorbike">Motorbike driver</option>
                    <option value="tricycle">Tricycle driver</option>
                </select>
            </div>

            <div className="fleet-link-wrap">
                <p>Have multiple vehicles?</p>
                <a href="#" className="fleet-link">Sign up as a fleet owner →</a>
            </div>

            <div className={`form-group ${errors.includes('firstName') ? 'has-error' : ''}`}>
                <label>First name <span>*</span></label>
                <input type="text" className="input-field" placeholder="First name" value={formData.firstName} onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setErrors(errors.filter(e => e !== 'firstName')); }} />
            </div>

            <div className={`form-group ${errors.includes('lastName') ? 'has-error' : ''}`}>
                <label>Last name <span>*</span></label>
                <input type="text" className="input-field" placeholder="Last name" value={formData.lastName} onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); setErrors(errors.filter(e => e !== 'lastName')); }} />
            </div>

            <div className={`form-group ${errors.includes('dob') ? 'has-error' : ''}`}>
                <label>Date of Birth <span>*</span></label>
                <input type="date" className="input-field" value={formData.dob} onChange={(e) => { setFormData({ ...formData, dob: e.target.value }); setErrors(errors.filter(e => e !== 'dob')); }} />
            </div>

            <div className={`form-group ${errors.includes('gender') ? 'has-error' : ''}`}>
                <label>Gender <span>*</span></label>
                <select className="select-field" value={formData.gender} onChange={(e) => { setFormData({ ...formData, gender: e.target.value }); setErrors(errors.filter(e => e !== 'gender')); }}>
                    <option value="">Select option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <p className="form-help">If you select your gender as Female, then we may send you communications specific to women drivers</p>
            </div>

            <div className="form-group">
                <label>Referral code</label>
                <input type="text" className="input-field" value={formData.referralCode} onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })} />
                <p className="form-help">Your referrer will be able to see your name, phone number, and completed rides</p>
            </div>

            <div className="reg-footer">
                <button className="btn-next-bolt" onClick={handleNext} disabled={loading}>
                    {loading ? <div className="bolt-loader-thick"></div> : 'Next'}
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="reg-form-section">
            <h2 className="section-title">Driver Information</h2>
            <p className="section-subtitle">Your national ID and license details will be kept private.</p>

            <div className={`form-group ${errors.includes('licenseNumber') ? 'has-error' : ''}`}>
                <label>Driver's license number for Cars / NIN for Motorbike and Tricycles. <span>*</span></label>
                <input type="text" className="input-field" placeholder="AB235235" value={formData.licenseNumber} onChange={(e) => { setFormData({ ...formData, licenseNumber: e.target.value }); setErrors(errors.filter(e => e !== 'licenseNumber')); }} />
                <p className="form-help">If you're a Car driver, add your license number on your driver's license, if you're a Motorbike or Tricycle driver, add your National ID number.</p>
            </div>

            <div className="form-group">
                <label>Driver's profile photo <span>*</span></label>
                <p className="form-help">Please provide a clear portrait picture (not a full body picture) of yourself. It should show your full face, front view, with eyes open (Do not wear a cap, earphones, or glasses)</p>
                <div className="upload-box-bolt">
                    <Upload size={18} />
                    <span>Upload file</span>
                </div>
            </div>

            <div className="form-group">
                <label>Driver's license <span>*</span></label>
                <p className="form-help">Please provide a clear driver's license (not expired) showing the license number, your name, and date of birth and expiry date (make sure all details are readable). You can provide a JTB form in place of your driver's license if it is expired.</p>
                <div className="upload-box-bolt">
                    <Upload size={18} />
                    <span>Upload file</span>
                </div>
            </div>

            <div className="reg-footer">
                <button className="btn-back-bolt" onClick={handleBack} disabled={loading}>Back</button>
                <button className="btn-next-bolt" onClick={handleNext} disabled={loading}>
                    {loading ? <div className="bolt-loader-thick"></div> : 'Next'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="reg-flow-container">
            <div className="reg-header-bolt">
                <div className="reg-logo-bolt">
                    <span className="logo-main">reloExpress</span>
                    <span className="logo-sub">Driver</span>
                </div>
                <div className="progress-stepper-bolt">
                    <div className={`step-pipe-bolt ${step >= 1 ? 'active' : ''}`}></div>
                    <div className={`step-pipe-bolt ${step >= 2 ? 'active' : ''}`}></div>
                    <div className={`step-pipe-bolt ${step >= 3 ? 'active' : ''}`}></div>
                    <div className={`step-pipe-bolt ${step >= 4 ? 'active' : ''}`}></div>
                </div>
            </div>

            <div className="reg-card">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && (
                    <div className="completion-card">
                        <CheckCircle size={64} color="#32bb78" />
                        <h2>Thank you!</h2>
                        <p>Registration steps completed successfully. Our team will review your application.</p>
                        <button className="btn-next-bolt" onClick={() => window.location.href = '/'}>Go to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationFlow;
