import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import RegistrationForm from './RegistrationForm';
import './Hero.css';

const slides = [
    'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=1920',
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="hero">
            <div className="hero-slideshow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="hero-slide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${slides[currentSlide]})`,
                        }}
                    />
                </AnimatePresence>
            </div>

            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="hero-badge">
                        <Rocket size={16} className="rocket-icon" />
                        <span>Now operating in 12+ cities</span>
                    </div>
                    <h1>
                        Deliver with <span>reloExpress</span>,<br />earn on your schedule
                    </h1>
                    <p>
                        Join Nigeria's fastest growing delivery network. Whether you have a bike, car, or van,
                        you can start earning weekly payouts today.
                    </p>
                    <div className="hero-features">
                        <div className="hero-feature">
                            <CheckCircle className="feature-icon" />
                            <span>Weekly Payouts</span>
                        </div>
                        <div className="hero-feature">
                            <Clock className="feature-icon" />
                            <span>Flexible Hours</span>
                        </div>
                        <div className="hero-feature">
                            <ShieldCheck className="feature-icon" />
                            <span>Partner Support</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-form-wrapper"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    id="apply"
                >
                    <RegistrationForm />
                </motion.div>
            </div>

            <div className="hero-wave">
                <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
                    <path fill="var(--bg-main)" fillOpacity="1" d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,74.7C672,75,768,53,864,42.7C960,32,1056,43,1152,53.3C1248,64,1344,75,1392,80L1440,85L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>
        </header>
    );
};

export default Hero;
