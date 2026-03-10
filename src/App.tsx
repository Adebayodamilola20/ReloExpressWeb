import Navbar from './components/common/Navbar';
import Hero from './components/home/Hero';
import PartnerTypes from './components/home/PartnerTypes';
import Benefits from './components/home/Benefits';
import HowItWorks from './components/home/HowItWorks';
import CityVision from './components/home/CityVision';
import FAQ from './components/home/FAQ';
import AppDownload from './components/home/AppDownload';
import Footer from './components/common/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <PartnerTypes />
      <Benefits />
      <HowItWorks />
      <CityVision />
      <FAQ />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default App;
