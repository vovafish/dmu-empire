import { useNavigate } from 'react-router-dom';
import style from './Password.module.scss';

export const PasswordResetFail = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Uh oh...</h1>
        <p>Something went wrong while trying to reset your passwprd</p>
        <button className="main-btn" onClick={() => navigate('/login')}>
          Back to Login
        </button>
      </main>
    </div>
  );
};
