import React from 'react';
import { motion } from 'framer-motion';
import './BeYourOwnBoss.css';

const BeYourOwnBoss: React.FC = () => {
    return (
        <section className="be-your-boss">
            <div className="container boss-container">
                <div className="boss-card">
                    <div className="boss-info">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Be your own boss. Start delivering and earning!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            It takes just 2 minutes to submit your information.
                        </motion.p>
                        <motion.a
                            href="#apply"
                            className="boss-cta"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Apply online
                        </motion.a>
                    </div>

                    <motion.div
                        className="boss-mockup"
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Smaller tilted phone mockup */}
                        <div className="mini-phone">
                            <div className="mini-screen">
                                <div className="mini-header">Go online</div>
                                <div className="mini-map">
                                    <div className="mini-circle"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BeYourOwnBoss;
