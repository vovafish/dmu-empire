import { useNavigate } from 'react-router-dom';

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <div>
        <h1>Uh oh...</h1>
        <p>Something went wrong while trying to reset your passwprd</p>
      </div>
      <button onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  );
};
