import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <a href="#apply" className="nav-cta btn btn-primary" onClick={() => setIsMenuOpen(false)}>
            Apply to deliver
          </a>
        </div>

        <div className="nav-actions-mobile">
          <button 
            className="theme-toggle mobile-theme-only" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
