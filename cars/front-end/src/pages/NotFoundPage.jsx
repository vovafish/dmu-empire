import style from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const phrases = [
    "Looks like you took a wrong turn, but don't worry - even GPS gets lost sometimes!",
    "Ruh-roh, you've hit a dead end - time to rev up and try a new route!",
    "Sorry, we couldn't steer you in the right direction - but we're working on it!",
    'Oops, it looks like your car has gone rogue - better bring out the mechanic!',
    "Lost on the open road? Don't worry, we'll help you find your way back to the fast lane!",
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  const randomPhrase = phrases[randomIndex];
  return (
    <div className="mainContainer">
      <main className={style.main}>
        <h1>
          {randomPhrase} Click on the car
          <Link to="/cars">
            <span>&#128663;</span>
          </Link>
        </h1>

        <img
          src="https://mj-gallery.com/289e77e1-de83-4e2e-bb6b-55a64270c93c/grid_0_640_N.webp"
          alt="Car driving away"
        />
      </main>
    </div>
  );
};

export default NotFoundPage;
