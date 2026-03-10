import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play } from 'lucide-react';
import './AppDownload.css';

const AppDownload: React.FC = () => {
    return (
        <section id="app" className="app-download">
            <div className="container app-container">
                <motion.div
                    className="app-text"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Manage everything with the <span>reloExpress Partner</span> app</h2>
                    <p>
                        Track your earnings, accept new delivery requests, and navigate to destinations
                        with ease. Our app is designed to help you succeed on the road.
                    </p>

                    <div className="download-btns">
                        <a href="#" className="download-btn">
                            <Apple size={28} />
                            <div className="btn-text">
                                <span>Download on the</span>
                                <strong>App Store</strong>
                            </div>
                        </a>
                        <a href="#" className="download-btn">
                            <Play size={28} fill="currentColor" />
                            <div className="btn-text">
                                <span>GET IT ON</span>
                                <strong>Google Play</strong>
                            </div>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="app-mockup"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="phone-frame">
                        <div className="phone-screen">
                            <div className="mock-app-content">
                                <div className="mock-header">
                                    <span>Online</span>
                                    <div className="status-toggle"></div>
                                </div>
                                <div className="mock-stats">
                                    <div className="mock-stat">
                                        <strong>₦42,500</strong>
                                        <span>Today's Earnings</span>
                                    </div>
                                </div>
                                <div className="mock-delivery-card">
                                    <div className="card-header">New Delivery Request</div>
                                    <div className="card-body">
                                        <p><strong>Pick-up:</strong> Ikeja, Lagos</p>
                                        <p><strong>Drop-off:</strong> Victoria Island</p>
                                        <div className="card-price">₦3,200</div>
                                    </div>
                                    <button className="accept-btn">Accept Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AppDownload;
