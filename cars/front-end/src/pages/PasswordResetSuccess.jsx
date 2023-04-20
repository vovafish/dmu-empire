import { useNavigate } from 'react-router-dom';

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div>
        <h1>Success!</h1>
        <p>Your password has been reset, now you may login</p>
      </div>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};
