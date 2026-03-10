import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './CityVision.css';

const CityVision: React.FC = () => {
    return (
        <section className="city-vision">
            <div className="container">
                <div className="vision-content">
                    <motion.div
                        className="vision-text"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>Making cities for people, <span>not cars.</span></h2>
                        <p>By sharing our knowledge of the industry and real-time data we're helping to improve our cities.</p>

                        <div className="vision-feature">
                            <h3>Sharing best practices</h3>
                            <p>We're able to provide insights that help local authorities make their cities more connected and liveable.</p>
                            <a href="#" className="learn-more">
                                Learn more <ArrowRight size={18} />
                            </a>
                        </div>

                        <div className="vision-pagination">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </motion.div>

                    <div className="vision-controls">
                        <button className="control-btn prev" aria-label="Previous slide">
                            <ArrowRight size={24} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button className="control-btn next" aria-label="Next slide">
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CityVision;
