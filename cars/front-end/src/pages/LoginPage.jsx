import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import style from '../pages/LoginPage.module.scss';

const LoginPage = () => {
  const [, setToken] = useToken();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // Function to handle user login
  const onLogInClicked = async () => {
    try {
      // Send login request to server
      const response = await axios.post('/api/login', {
        email: emailValue,
        password: passwordValue,
      });

      // Extract token from server response
      const { token } = response.data;

      // Store token in local storage
      setToken(token);

      // Navigate to the cars page
      navigate('/cars');
    } catch (error) {
      // Handle login error
      if (error.response && error.response.status === 401) {
        setErrorMessage('Email or password is incorrect.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className={style.block}>
      <div></div>
      <div>
        <div className="mainContainer">
          <main className={style.main}>
            <h1 className="main-title">Sign in</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <div className={style.form}>
              <input
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"
              />
              <input
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
              />
              <button
                disabled={!emailValue || !passwordValue}
                onClick={onLogInClicked}
              >
                Sign In
              </button>
              <div className={style.options}>
                <button
                  className={style.btn}
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot password?
                </button>
                <button
                  className={style.btn}
                  onClick={() => navigate('/signup')}
                >
                  Don't have an account? Sign Up
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
