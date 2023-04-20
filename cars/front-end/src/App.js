import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdditionalItemPage from './pages/AdditionalItemPage';
import ReturnOfVehiclePage from './pages/ReturnOfVehiclePage';
import PolicyPage from './pages/PolicyPage';
import CarPage from './pages/CarPage';
import CarListPage from './pages/CarsListPage';
import NavBar from './NavBar';
import Footer from './Footer';
import NotFoundPage from './pages/NotFoundPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { PleaseVerifyEamilPage } from './pages/PleaseVerifyEmailPage';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="verify-email/:verificationString"
              element={<EmailVerificationLandingPage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:passwordResetCode"
              element={<PasswordResetLandingPage />}
            />
            <Route path="/please-verify" element={<PleaseVerifyEamilPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cars" element={<CarListPage />} />
            <Route path="/cars/:carId" element={<CarPage />} />
            <Route path="/additional-item" element={<AdditionalItemPage />} />
            <Route path="/return-vehicle" element={<ReturnOfVehiclePage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
