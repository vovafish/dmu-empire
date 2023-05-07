//importing all the pages
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
    // Set up the router with BrowserRouter
    <BrowserRouter>
      <div className="App">
        {/* Render the navigation bar */}
        <NavBar />
        <div>
          {/* Set up the routes using the Routes component */}
          <Routes>
            {/* Home page route */}
            <Route exact path="/" element={<HomePage />} />
            {/* Email verification route with a dynamic parameter */}
            <Route
              path="verify-email/:verificationString"
              element={<EmailVerificationLandingPage />}
            />
            {/* Login page route */}
            <Route path="/login" element={<LoginPage />} />
            {/* Sign up page route */}
            <Route path="/signup" element={<SignUpPage />} />
            {/* Forgot password page route */}
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* Password reset route with a dynamic parameter */}
            <Route
              path="/reset-password/:passwordResetCode"
              element={<PasswordResetLandingPage />}
            />
            {/* Page to display after signing up */}
            <Route path="/please-verify" element={<PleaseVerifyEamilPage />} />
            {/* About page route */}
            <Route path="/about" element={<AboutPage />} />
            {/* Car list page route */}
            <Route path="/cars" element={<CarListPage />} />
            {/* Car details page route with a dynamic parameter */}
            <Route path="/cars/:carId" element={<CarPage />} />
            {/* Additional item page route */}
            <Route path="/additional-item" element={<AdditionalItemPage />} />
            {/* Return of vehicle page route */}
            <Route path="/return-vehicle" element={<ReturnOfVehiclePage />} />
            {/* Policy page route */}
            <Route path="/policy" element={<PolicyPage />} />
            {/* Protected profile page route that requires authentication */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            {/* Catch-all route for unknown URLs */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        {/* Render the footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
