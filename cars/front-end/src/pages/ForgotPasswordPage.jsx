import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const navigate = useNavigate();
  const onSubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return success ? (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Success</h1>
        <p>Check your email for reset link</p>
      </main>
    </div>
  ) : (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Do you want to make a new password?</h1>
        <p>Please enter your email and we will send you a reset link :)</p>
        {errorMessage && <div>{errorMessage}</div>}
        <input
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="someone@gmail.com"
        />
        <button
          className="main-btn"
          disabled={!emailValue}
          onClick={onSubmitClicked}
        >
          Send Reset Link
        </button>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
