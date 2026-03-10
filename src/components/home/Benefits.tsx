import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, Banknote, Laptop, FileText, Bike } from 'lucide-react';
import './Benefits.css';

const benefitItems = [
    {
        icon: <Calendar className="benefit-icon-svg" />,
        title: 'Drive and earn when you like',
        description: 'Earn during evenings and weekends, or make more money by driving more frequently. It\'s up to you.'
    },
    {
        icon: <Wallet className="benefit-icon-svg" />,
        title: 'A reliable source of income',
        description: 'You\'ll receive orders from our large network of customers anytime you\'re online.'
    },
    {
        icon: <Banknote className="benefit-icon-svg" />,
        title: 'Weekly payouts',
        description: 'Receive your earnings at the end of each week. There are no hidden fees and you\'ll only pay commission on your earnings.'
    }
];

const stepItems = [
    {
        icon: <Laptop className="step-icon-svg" />,
        title: '1. Register online',
        description: 'Tell us which city you\'d like to drive in and the type of vehicle you have. We\'ll email you with the next steps.'
    },
    {
        icon: <FileText className="step-icon-svg" />,
        title: '2. Upload your documents',
        description: 'The documents needed to drive on the reloExpress platform can vary depending on your location.'
    },
    {
        icon: <Bike className="step-icon-svg" />,
        title: '3. Get started',
        description: 'Once approved, we will connect you with a quick onboarding session to get you started on the road.'
    }
];

const Benefits: React.FC = () => {
    return (
        <section id="benefits" className="benefits-section">
            <div className="container">
                <div className="benefits-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Why become a <span>reloExpress</span> partner?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Whether you want to drive for a few hours occasionally or want to earn money more frequently,
                        with reloExpress you can fit driving around your schedule.
                    </motion.p>
                </div>

                <div className="benefits-row">
                    {benefitItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="benefit-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="icon-wrapper">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="steps-section">
                    <motion.h2
                        className="steps-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Get started
                    </motion.h2>

                    <div className="benefits-row">
                        {stepItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="benefit-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                            >
                                <div className="icon-wrapper">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
