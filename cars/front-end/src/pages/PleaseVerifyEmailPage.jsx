import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PleaseVerifyEamilPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/cars');
    }, 3000);
  }, [navigate]);

  return (
    <div className="mainContainer">
      <div>
        <h1>Thanks for signing up!</h1>
        <p>
          A verification email has been sent to the email address you provided.
          Please verify your email to unlock more features.
        </p>
      </div>
    </div>
  );
};
