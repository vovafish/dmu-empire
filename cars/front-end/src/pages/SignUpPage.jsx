import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import style from '../pages/SignUpPage.module.scss';

export const validatePhoneNumber = (number) => {
  const numberRegex = /^(\+44|0)\d{10}$/;
  return numberRegex.test(number);
};

const SignUpPage = () => {
  // State hooks for storing form input values and token
  const [, setToken] = useToken();
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Custom hook for navigation
  const navigate = useNavigate();

  // Function to validate UK phone number using regex

  // Function to handle sign up button click event
  const onSignUpClicked = async () => {
    let phone_number = '';

    // Validate phone number if provided
    if (numberValue.trim() !== '') {
      if (!validatePhoneNumber(numberValue.trim())) {
        setErrorMessage('Please enter a valid UK phone number');
        return;
      }
      phone_number = numberValue.trim();
    }

    // Make API call to sign up user with provided information
    const response = await axios.post('/api/signup', {
      first_name: firstNameValue,
      last_name: lastNameValue,
      phone_number: phone_number,
      email: emailValue,
      password: passwordValue,
    });

    // Store token in local storage and navigate to verify email page
    const { token } = response.data;
    setToken(token);
    navigate('/please-verify');
  };

  return (
    <div className={style.block}>
      <div></div>
      <div>
        <div className="mainContainer">
          <main className={style.main}>
            <h1 className="main-title">Registeration</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <div className={style.form}>
              <input
                value={firstNameValue}
                onChange={(e) => setFirstNameValue(e.target.value)}
                placeholder="Your first name"
                required
              />
              <input
                value={lastNameValue}
                onChange={(e) => setLastNameValue(e.target.value)}
                placeholder="Your last name"
                required
              />
              <input
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                type="tel"
                placeholder="01234567890 (optional)"
                name="phone"
              />
              <input
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"
                required
              />
              <input
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                type="password"
                placeholder="password"
                required
              />
              <input
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                type="password"
                placeholder="Confirm password"
                required
              />
              <button
                disabled={
                  !emailValue ||
                  !firstNameValue ||
                  !lastNameValue ||
                  !passwordValue ||
                  passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}
              >
                Register
              </button>
              <div className={style.options}>
                <button
                  className={style.btn}
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Log In.
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
