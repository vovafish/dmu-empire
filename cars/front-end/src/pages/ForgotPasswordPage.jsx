import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState(''); // state for error message
  const [success, setSuccess] = useState(false); // state for success message
  const [emailValue, setEmailValue] = useState(''); // state for email input value
  const navigate = useNavigate(); // navigation hook
  const onSubmitClicked = async () => {
    // function to handle submit button click
    try {
      await axios.put(`/api/forgot-password/${emailValue}`); // make PUT request to server to initiate password reset
      setSuccess(true); // update success state to show success message
      setTimeout(() => {
        navigate('/login'); // navigate to login page after 3 seconds
      }, 3000);
    } catch (e) {
      setErrorMessage(e.message); // if an error occurs, update error state with error message
    }
  };

  return success ? ( // if success state is true, show success message
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Success</h1>
        <p>Check your email for reset link</p>
      </main>
    </div>
  ) : (
    // otherwise, show password reset form
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Do you want to make a new password?</h1>
        <p>Please enter your email and we will send you a reset link :)</p>
        {errorMessage && <div>{errorMessage}</div>}{' '}
        {/* if error state is not empty, show error message */}
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
