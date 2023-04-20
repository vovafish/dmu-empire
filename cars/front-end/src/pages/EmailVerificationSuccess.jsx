import { useNavigate } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div>
        <h1>Success!</h1>
        <p>Thanks for verifying your email </p>
      </div>
      <button onClick={() => navigate('/')}>Go to Home page</button>
    </div>
  );
};
