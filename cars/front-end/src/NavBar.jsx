import { Link } from 'react-router-dom';
import style from './styles/layout/NavBar.module.scss';
import logo from './img/logo.png';
import { useNavigate } from 'react-router-dom';
import { useToken } from './auth/useToken';
import { useUser } from './auth/useUser';

// Functional component for the navigation bar
const NavBar = () => {
  // Using custom hooks to get the token and setToken function
  const [token] = useToken();

  // Using react-router-dom hook to navigate
  const navigate = useNavigate();

  // Using custom hook to get the user object
  const user = useUser();

  // Function to log out the user
  const logOut = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    // Navigate to login page
    navigate('/login');
  };

  // Function to navigate to login page
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

            <Link to="/profile">
              <h3 className={style.user}>Hi, {user.first_name}</h3>
            </Link>
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
