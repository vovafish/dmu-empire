import { Link } from 'react-router-dom';
import style from './styles/layout/NavBar.module.scss';
import logo from './img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useToken } from './auth/useToken';
import { useUser } from './auth/useUser';

const NavBar = () => {
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const user = useUser();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const logIn = () => {
    navigate('/login');
  };

  return (
    <nav className={style.nav}>
      <div className={style.logoSite}>
        <img src={logo} alt="logo" />
      </div>
      <div className={style.links}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cars">Cars</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/additional-item">Additional Items</Link>
          </li>
          <li>
            <Link to="/return-vehicle">Return Car</Link>
          </li>
        </ul>
      </div>
      <div className={style.userActivity}>
        {token ? (
          <>
            <button className={style.button} onClick={logOut}>
              Logout
            </button>
            <h3 className={style.user}>Hi, {user.first_name}</h3>
          </>
        ) : (
          <>
            <button className={style.button} onClick={logIn}>
              Login
            </button>
            <h3 className={style.user}>Hi, customer</h3>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
