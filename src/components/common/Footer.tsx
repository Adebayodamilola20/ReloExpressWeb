import React from 'react';
import { Rocket, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <a href="/" className="logo">
                        <Rocket className="logo-icon" />
                        relo<span>Express</span>
                    </a>
                    <p>
                        Nigeria's premier courier and delivery service platform.
                        Empowering partners to earn more through technology.
                    </p>
                    <div className="social-links">
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Platform</h4>
                    <ul>
                        <li><a href="#benefits">Benefits</a></li>
                        <li><a href="#how-it-works">How it works</a></li>
                        <li><a href="#app">Partner App</a></li>
                        <li><a href="#apply">Apply to Drive</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Sustainability</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Contact Support</h4>
                    <ul>
                        <li><MapPin size={18} /> 123 Delivery Way, Ikeja, Lagos</li>
                        <li><Phone size={18} /> +234 1 234 5678</li>
                        <li><Mail size={18} /> support@reloexpress.com</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container bottom-content">
                    <p>&copy; {new Date().getFullYear()} reloExpress Ventures. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#">Terms & Conditions</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
