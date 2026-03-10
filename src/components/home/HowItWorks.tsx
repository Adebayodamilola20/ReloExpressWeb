import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Bike, PlayCircle } from 'lucide-react';
import './HowItWorks.css';

const steps = [
    {
        icon: <UserPlus size={32} />,
        title: 'Register Online',
        description: 'Fill out our simple application form with your basic details and city of operation.'
    },
    {
        icon: <FileText size={32} />,
        title: 'Submit Documents',
        description: 'Upload your ID and vehicle documents for a quick verification process.'
    },
    {
        icon: <Bike size={32} />,
        title: 'Get Verified',
        description: 'Once approved, we will connect you with a quick onboarding session to get you started.'
    },
    {
        icon: <PlayCircle size={32} />,
        title: 'Start Delivering',
        description: 'Log in to the app, accept delivery requests, and start earning money immediately.'
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2>Getting started is <span>simple</span></h2>
                    <p>Four easy steps to start your journey as a reloExpress delivery partner.</p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="step-card"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="step-number">{index + 1}</div>
                            <div className="step-content">
                                <div className="step-icon-wrapper">
                                    {step.icon}
                                </div>
                                <div className="step-text">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
