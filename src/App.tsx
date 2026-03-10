import Navbar from './components/common/Navbar';
import Hero from './components/home/Hero';
import PartnerTypes from './components/home/PartnerTypes';
import Benefits from './components/home/Benefits';
import CityVision from './components/home/CityVision';
import FAQ from './components/home/FAQ';
import AppDownload from './components/home/AppDownload';
import HowAppWorks from './components/home/HowAppWorks';
import CityTools from './components/home/CityTools';
import Safety from './components/home/Safety';
import Footer from './components/common/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <PartnerTypes />
      <Benefits />
      <HowAppWorks />
      <CityVision />
      <CityTools />
      <Safety />
      <FAQ />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default App;
