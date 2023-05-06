import { useNavigate } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div style={{ padding: '3rem 0' }}>
        <h1>Success!</h1>
        <p>Thanks for verifying your email </p>
        <button className="main-btn" onClick={() => navigate('/')}>
          Go to Home page
        </button>
      </div>
    </div>
  );
};
