import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Info } from 'lucide-react';
import './Safety.css';

const safetyFeatures = [
    {
        icon: <Shield size={32} />,
        title: 'Unique safety features',
        description: 'Innovative safety features, like our patented tandem riding prevention system, and a cognitive reaction test help to prevent riding under the influence of alcohol or other substances and raise awareness of its dangers.'
    },
    {
        icon: <Info size={32} />,
        title: 'Educating riders',
        description: 'We encourage responsible usage of e-vehicles to ensure the safety of riders and the wider public. Our Safety Toolkit allows riders to use a Beginner Mode, learn about local rules, and read safety instructions and tips.'
    },
    {
        icon: <div className="parking-icon-p">P</div>,
        title: 'Parking responsibly',
        description: "We educate our users to park responsibly and encourage them to report bad examples they see on the streets. Additionally, our AI technology detects parking violations and shows riders how to park their scooters safely."
    }
];

const Safety: React.FC = () => {
    return (
        <section className="safety-section">
            <div className="container">
                <div className="safety-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Safety as a priority
                    </motion.h2>
                </div>

                <div className="safety-grid">
                    {safetyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="safety-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="safety-icon-box">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Safety;
