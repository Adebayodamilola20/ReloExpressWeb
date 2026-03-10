import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="/" className="logo">
          <Rocket size={22} className="logo-icon" />
          relo<span>Express</span>
        </a>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#apply" onClick={() => setIsMenuOpen(false)}>Overview</a>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How it works</a>
          <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
          <a href="#benefits" onClick={() => setIsMenuOpen(false)}>Benefits</a>
          <a href="#apply" className="nav-cta btn btn-primary" onClick={() => setIsMenuOpen(false)}>
            Apply to deliver
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
