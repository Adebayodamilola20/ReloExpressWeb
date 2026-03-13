import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchableDropdown from './SearchableDropdown';
import { CheckCircle, Upload } from 'lucide-react';
import { API_BASE_URL } from '../../api/config';
import './RegistrationFlow.css';

const vehicleTypes = ['GAC', 'Seat', 'Renault', 'Peugeot', 'Toyota', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz', 'Volkswagen'];
const vehicleModels = ['107', '106', '108', '206', '207', '208', '301', '307', '308', '407', '408', '508', '2008', '3008', '5008'];
const vehicleColors = ['White', 'Black', 'Silver', 'Grey', 'Blue', 'Red', 'Brown', 'Green', 'Yellow', 'Gold'];

const RegistrationFlow: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        partnerType: '',
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        referralCode: '',
        vehicleType: '',
        vehicleMakeModel: '',
        vehicleYear: '',
        plateNumber: '',
        vehicleColor: '',
        allowLuggage: false,
        vehicleFrontPhoto: null as string | null,
        vehicleBackPhoto: null as string | null,
        vehicleVideo: null as string | null,
        driversLicense: null as string | null,
        insuranceCertificate: null as string | null,
        vehicleRegCertificate: null as string | null,
        roadworthinessCertificate: null as string | null,
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
            if (!formData.vehicleType) newErrors.push('vehicleType');
            if (!formData.vehicleMakeModel) newErrors.push('vehicleMakeModel');
            if (!formData.vehicleYear) newErrors.push('vehicleYear');
            if (!formData.plateNumber) newErrors.push('plateNumber');
            if (!formData.vehicleColor) newErrors.push('vehicleColor');
        } else if (step === 3) {
            if (!formData.vehicleFrontPhoto) newErrors.push('vehicleFrontPhoto');
            if (!formData.vehicleBackPhoto) newErrors.push('vehicleBackPhoto');
            if (!formData.vehicleVideo) newErrors.push('vehicleVideo');
        } else if (step === 4) {
            if (!formData.driversLicense) newErrors.push('driversLicense');
            if (!formData.insuranceCertificate) newErrors.push('insuranceCertificate');
            if (!formData.vehicleRegCertificate) newErrors.push('vehicleRegCertificate');
            if (!formData.roadworthinessCertificate) newErrors.push('roadworthinessCertificate');
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleNext = async () => {
        if (validateStep()) {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setLoading(false);
            if (step < 5) {
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
                <select className="select-field" value={formData.partnerType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, partnerType: e.target.value }); setErrors(errors.filter(e => e !== 'partnerType')); }}>
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
                <input type="text" className="input-field" placeholder="First name" value={formData.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, firstName: e.target.value }); setErrors(errors.filter(e => e !== 'firstName')); }} />
            </div>

            <div className={`form-group ${errors.includes('lastName') ? 'has-error' : ''}`}>
                <label>Last name <span>*</span></label>
                <input type="text" className="input-field" placeholder="Last name" value={formData.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, lastName: e.target.value }); setErrors(errors.filter(e => e !== 'lastName')); }} />
            </div>

            <div className={`form-group ${errors.includes('dob') ? 'has-error' : ''}`}>
                <label>Date of Birth <span>*</span></label>
                <input type="date" className="input-field" value={formData.dob} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, dob: e.target.value }); setErrors(errors.filter(e => e !== 'dob')); }} />
            </div>

            <div className={`form-group ${errors.includes('gender') ? 'has-error' : ''}`}>
                <label>Gender <span>*</span></label>
                <select className="select-field" value={formData.gender} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setFormData({ ...formData, gender: e.target.value }); setErrors(errors.filter(e => e !== 'gender')); }}>
                    <option value="">Select option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <p className="form-help">If you select your gender as Female, then we may send you communications specific to women drivers</p>
            </div>

            <div className="form-group">
                <label>Referral code</label>
                <input type="text" className="input-field" value={formData.referralCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, referralCode: e.target.value })} />
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
            <h2 className="section-title">Vehicle Information</h2>
            <p className="section-subtitle">Fill in information about your vehicle. You can read Cruz car requirements for a guide.</p>

            <SearchableDropdown
                label="Vehicle type"
                placeholder="Select Vehicle"
                options={vehicleTypes}
                value={formData.vehicleType}
                onChange={(val) => setFormData({ ...formData, vehicleType: val })}
                error={errors.includes('vehicleType')}
                required
            />

            <SearchableDropdown
                label="Vehicle Make/Model"
                placeholder="Select Vehicle Model"
                options={vehicleModels}
                value={formData.vehicleMakeModel}
                onChange={(val) => setFormData({ ...formData, vehicleMakeModel: val })}
                error={errors.includes('vehicleMakeModel')}
                required
            />

            <div className={`form-group ${errors.includes('vehicleYear') ? 'has-error' : ''}`}>
                <label>Vehicle model year <span>*</span></label>
                <div className="input-with-icon-bolt">
                    <input 
                        type="number" 
                        className="input-field" 
                        placeholder="YYYY" 
                        value={formData.vehicleYear} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, vehicleYear: e.target.value }); setErrors(errors.filter(e => e !== 'vehicleYear')); }} 
                    />
                </div>
                <p className="form-help">We use this information to determine the category your car falls into, ensuring the best ride experience for both drivers and riders.</p>
            </div>

            <div className={`form-group ${errors.includes('plateNumber') ? 'has-error' : ''}`}>
                <label>Plate number <span>*</span></label>
                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="NGN-483-2G" 
                    value={formData.plateNumber} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, plateNumber: e.target.value }); setErrors(errors.filter(e => e !== 'plateNumber')); }} 
                />
            </div>

            <SearchableDropdown
                label="Vehicle color"
                placeholder="Vehicle color"
                options={vehicleColors}
                value={formData.vehicleColor}
                onChange={(val) => setFormData({ ...formData, vehicleColor: val })}
                error={errors.includes('vehicleColor')}
                required
            />

            <div className="form-group checkbox-group-bolt">
                <label className="checkbox-label-bolt">
                    <input 
                        type="checkbox" 
                        checked={formData.allowLuggage} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, allowLuggage: e.target.checked })} 
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">Allow Luggages</span>
                </label>
            </div>

            <div className="reg-footer">
                <button className="btn-back-bolt" onClick={handleBack} disabled={loading}>Back</button>
                <button className="btn-next-bolt" onClick={handleNext} disabled={loading}>
                    {loading ? <div className="bolt-loader-thick"></div> : 'Next'}
                </button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="reg-form-section">
            <h2 className="section-title">Vehicle Media</h2>
            <p className="section-subtitle">We'll need some pictures of your vehicle. Don't worry, submitting them is simple! You can scan them or take clear photos and upload them directly.</p>

            <div className={`form-group ${errors.includes('vehicleFrontPhoto') ? 'has-error' : ''}`}>
                <label>Front photo of your car <span>*</span></label>
                <p className="form-help">Upload a clear Front view photo that captures the plate number.</p>
                <div 
                    className={`upload-box-bolt ${formData.vehicleFrontPhoto ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, vehicleFrontPhoto: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.vehicleFrontPhoto ? 'Front photo uploaded' : 'Upload file'}</span>
                </div>
            </div>

            <div className={`form-group ${errors.includes('vehicleBackPhoto') ? 'has-error' : ''}`}>
                <label>Back Photo of your car <span>*</span></label>
                <p className="form-help">Upload a clear Back view photo that captures the plate number.</p>
                <div 
                    className={`upload-box-bolt ${formData.vehicleBackPhoto ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, vehicleBackPhoto: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.vehicleBackPhoto ? 'Back photo uploaded' : 'Upload file'}</span>
                </div>
            </div>

            <div className={`form-group ${errors.includes('vehicleVideo') ? 'has-error' : ''}`}>
                <label>Video <span>*</span></label>
                <p className="form-help">Upload a short video showing the overall condition of your vehicle.</p>
                <div 
                    className={`upload-box-bolt ${formData.vehicleVideo ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, vehicleVideo: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.vehicleVideo ? 'Video uploaded' : 'Upload file'}</span>
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

    const renderStep4 = () => (
        <div className="reg-form-section">
            <h2 className="section-title">Upload Documents</h2>
            <p className="section-subtitle">To finalize your driver registration, we'll need some documents. Don't worry, submitting them is simple! You can scan them or take clear photos and upload them directly.</p>

            <div className={`form-group ${errors.includes('driversLicense') ? 'has-error' : ''}`}>
                <label>Driver's License <span>*</span></label>
                <p className="form-help">Take a photo of your Driver's license, it should be well photographed ensuring the numbers are clearly visible.</p>
                <div 
                    className={`upload-box-bolt ${formData.driversLicense ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, driversLicense: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.driversLicense ? 'License uploaded' : 'Upload file'}</span>
                </div>
            </div>

            <div className={`form-group ${errors.includes('insuranceCertificate') ? 'has-error' : ''}`}>
                <label>Vehicle Insurance Certificate <span>*</span></label>
                <p className="form-help">Take a photo of your policy document. Ensuring the policy number and insurance company name are clearly visible.</p>
                <div 
                    className={`upload-box-bolt ${formData.insuranceCertificate ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, insuranceCertificate: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.insuranceCertificate ? 'Insurance uploaded' : 'Upload file'}</span>
                </div>
            </div>

            <div className={`form-group ${errors.includes('vehicleRegCertificate') ? 'has-error' : ''}`}>
                <label>Certificate of Vehicle Reg <span>*</span></label>
                <p className="form-help">Take a photo of your vehicle registration certificate.</p>
                <div 
                    className={`upload-box-bolt ${formData.vehicleRegCertificate ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, vehicleRegCertificate: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.vehicleRegCertificate ? 'Reg Certificate uploaded' : 'Upload file'}</span>
                </div>
            </div>

            <div className={`form-group ${errors.includes('roadworthinessCertificate') ? 'has-error' : ''}`}>
                <label>Roadworthiness Certificate <span>*</span></label>
                <p className="form-help">Take a photo of your vehicle roadworthiness certificate.</p>
                <div 
                    className={`upload-box-bolt ${formData.roadworthinessCertificate ? 'uploaded' : ''}`}
                    onClick={() => setFormData({ ...formData, roadworthinessCertificate: 'uploaded' })}
                >
                    <Upload size={18} />
                    <span>{formData.roadworthinessCertificate ? 'Roadworthiness uploaded' : 'Upload file'}</span>
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
                    <div className={`step-pipe-bolt ${step >= 5 ? 'active' : ''}`}></div>
                </div>
            </div>

            <div className="reg-card">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                        {step === 5 && (
                            <div className="completion-card">
                                <CheckCircle size={64} color="#32bb78" />
                                <h2>Thank you!</h2>
                                <p>Registration steps completed successfully. Our team will review your application.</p>
                                <button className="btn-next-bolt" onClick={() => window.location.href = '/'}>Go to Home</button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RegistrationFlow;

