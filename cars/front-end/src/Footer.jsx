import { Link } from 'react-router-dom';
import style from './styles/layout/Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <h3>Find us</h3>
          <span>Gateway House, Leicester LE1 9BH</span>
        </div>
        <div>
          <h3>Call us</h3>
          <span>01234567890</span>
        </div>
        <div>
          <h3>Mail us</h3>
          <span>carempire@gmail.com</span>
        </div>
      </div>
      <hr />
      <div>
        <div>
          <span>
            <Link to="/policy">Our Policy and Privacy</Link>
          </span>
        </div>
        <div>
          <span>Copyright &copy; 2023, All Right Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
