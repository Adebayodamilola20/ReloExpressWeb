import React from 'react';
import { motion } from 'framer-motion';
import gekoImg from '../../assets/geko.png';
import './HowAppWorks.css';

const steps = [
    {
        number: 1,
        title: 'Accept a delivery request',
        description: 'The ReloExpress Partner app will automatically find deliveries for you.'
    },
    {
        number: 2,
        title: 'Pick up the items',
        description: 'The app will guide you to the pickup location. Once there, collect the items.'
    },
    {
        number: 3,
        title: 'Deliver to destination',
        description: 'Follow the directions to the drop-off point and complete the delivery in the app.'
    },
    {
        number: 4,
        title: 'Earn money',
        description: 'Track your earnings in real-time. You are always in full control of your schedule.'
    }
];

const HowAppWorks: React.FC = () => {
    return (
        <section className="how-app-works">
            <div className="container app-works-container">
                <div className="app-works-mockup">
                    <motion.div
                        className="phone-container"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="phone-bezel">
                            <img src={gekoImg} alt="ReloExpress App Mockup" className="geko-mockup-img" />
                        </div>
                    </motion.div>
                </div>

                <div className="app-works-content">
                    <motion.h2
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        How the <span>ReloExpress Partner</span> app works
                    </motion.h2>
                    <motion.p
                        className="subtitle"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Reliable and easy to use, with everything you need to deliver and earn when you want.
                    </motion.p>

                    <div className="app-steps">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="app-step-item"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            >
                                <div className="step-count">{step.number}</div>
                                <div className="step-info">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowAppWorks;
