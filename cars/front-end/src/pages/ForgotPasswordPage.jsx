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
      <div>
        <h1>Success</h1>
        <p>Check your email for reset link</p>
      </div>
    </div>
  ) : (
    <div className="mainContainer">
      <div>
        <h1>Forgot Password</h1>
        <p>Enter your email and we will send you a reset link</p>
        {errorMessage && <div>{errorMessage}</div>}
        <input
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="someone@gmail.com"
        />
        <button disabled={!emailValue} onClick={onSubmitClicked}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
