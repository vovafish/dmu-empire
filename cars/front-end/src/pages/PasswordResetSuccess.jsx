import { useNavigate } from 'react-router-dom';
import style from './Password.module.scss';

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>Success!</h1>
        <p>Your password has been reset, now you may login</p>
        <button className="main-btn" onClick={() => navigate('/login')}>
          Login
        </button>
      </main>
    </div>
  );
};
