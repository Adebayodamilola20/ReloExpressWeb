import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VerifyPage from './pages/VerifyPage';
import OTPPage from './pages/OTPPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
