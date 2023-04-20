import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import style from '../pages/SignUpPage.module.scss';

const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    const numberRegex = /^(\+44|0)\d{10}$/;
    return numberRegex.test(number);
  };

  const onSignUpClicked = async () => {
    let phone_number = '';
    if (numberValue.trim() !== '') {
      if (!/^(\+44|0)[1-9]\d{8,9}$/.test(numberValue.trim())) {
        setErrorMessage('Please enter a valid UK phone number');
        return;
      }
      phone_number = numberValue.trim();
    }

    const response = await axios.post('/api/signup', {
      first_name: firstNameValue,
      last_name: lastNameValue,
      phone_number: phone_number, //
      email: emailValue,
      password: passwordValue,
    });

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
            <h1 className="main-title">Register</h1>
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
                placeholder="01234 567890 (optional)"
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
