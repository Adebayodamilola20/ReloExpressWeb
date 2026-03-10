import React from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Clock, Package, Briefcase } from 'lucide-react';
import './Benefits.css';

const benefits = [
    {
        icon: <CircleDollarSign size={40} />,
        title: 'Reliable Earnings',
        description: 'Get paid weekly for every delivery. Competitive rates and transparent commissions.'
    },
    {
        icon: <Clock size={40} />,
        title: 'Flexible Schedule',
        description: 'You are the boss. Work whenever you want, whether it is day, night, or weekends.'
    },
    {
        icon: <Package size={40} />,
        title: 'Steady Demand',
        description: 'Access a constant stream of delivery orders from businesses and individuals in your city.'
    },
    {
        icon: <Briefcase size={40} />,
        title: 'Professional Growth',
        description: 'Build your own delivery business with our tools and extensive support network.'
    }
];

const Benefits: React.FC = () => {
    return (
        <section id="benefits" className="benefits">
            <div className="container">
                <div className="section-header">
                    <h2>Why partner with <span>reloExpress</span>?</h2>
                    <p>We provide the platform, tools, and support you need to earn on your terms.</p>
                </div>

                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="benefit-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="benefit-icon">{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
