import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';
import style from './Password.module.scss';

export const PasswordResetLandingPage = () => {
  const [passwordValue, setPasswordValue] = useState(''); // State variable for password input
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(''); // State variable for confirm password input

  const [isSuccess, setIsSuccess] = useState(false); // State variable to track if password reset is successful
  const [isFailure, setIsFailuer] = useState(false); // State variable to track if password reset failed

  const { passwordResetCode } = useParams(); // Get password reset code from URL params

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        // Send PUT request to reset password
        newPassword: passwordValue, // Send new password in the request body
      });
      setIsSuccess(true); // Update success state variable
    } catch (e) {
      setIsFailuer(true); // Update failure state variable
    }
  };

  if (isFailure) return <PasswordResetFail />; // Render PasswordResetFail component if reset fails
  if (isSuccess) return <PasswordResetSuccess />; // Render PasswordResetSuccess component if reset succeeds

  return (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Reset Password</h1>
        <p>Please enter a new password!</p>
        <input
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          placeholder="Confirm password"
        />
        <button
          className="main-btn"
          disabled={
            !passwordValue ||
            !confirmPasswordValue ||
            passwordValue !== confirmPasswordValue
          }
          onClick={onResetClicked}
        >
          Reset Password
        </button>
      </main>
    </div>
  );
};
