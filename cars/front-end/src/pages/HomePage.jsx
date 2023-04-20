import style from './HomePage.module.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="mainContainer">
      <main className={style.main}>
        <div>
          <h2 className="main-title">Brands we have</h2>
          <div>
            <Link to="/cars">Find more cars</Link>
          </div>
          <div className={style.brands}>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/74deb1191aeb438eb9764aef4b52665a.jpg"
                alt="BMW"
              />
              <span>BMW</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/03156d35774a4e0bb86272a4ddf7dc8a.jpg"
                alt="Ford"
              />
              <span>Ford</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/1758ab59de774da2933aef4d5e8d15f1.jpg"
                alt="Mercedes-Benz"
              />
              <span>Mercedes-Benz</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/906a0acc02ec458d8b8c3b4aa1dc426f.jpg"
                alt="Kia"
              />
              <span>Kia</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/e142e786ab8c4baab8b040f1feda4016.jpg"
                alt="Subaru"
              />
              <span>Subaru</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/%7Bresize%7D/226b3dbffe2b4155a69702dc9d547f4d.jpg"
                alt="Audi"
              />
              <span>Audi</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/c5c9eec1e08c42ca8ad1169fda72d4a8.jpg"
                alt="Tesla"
              />
              <span>Tesla</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/4a6329ba3a324c1c85f270082eccbbdc.jpg"
                alt="Lamborghini"
              />
              <span>Lamborghini</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="main-title">Brands we have</h2>
          <div>
            <Link to="/cars">Find more cars</Link>
          </div>
          <div className={style.brands}>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/74deb1191aeb438eb9764aef4b52665a.jpg"
                alt="BMW"
              />
              <span>BMW</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/03156d35774a4e0bb86272a4ddf7dc8a.jpg"
                alt="Ford"
              />
              <span>Ford</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/1758ab59de774da2933aef4d5e8d15f1.jpg"
                alt="Mercedes-Benz"
              />
              <span>Mercedes-Benz</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/906a0acc02ec458d8b8c3b4aa1dc426f.jpg"
                alt="Kia"
              />
              <span>Kia</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/e142e786ab8c4baab8b040f1feda4016.jpg"
                alt="Subaru"
              />
              <span>Subaru</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/%7Bresize%7D/226b3dbffe2b4155a69702dc9d547f4d.jpg"
                alt="Audi"
              />
              <span>Audi</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/c5c9eec1e08c42ca8ad1169fda72d4a8.jpg"
                alt="Tesla"
              />
              <span>Tesla</span>
            </div>
            <div>
              <img
                src="https://m.atcdn.co.uk/ect/media/4a6329ba3a324c1c85f270082eccbbdc.jpg"
                alt="Lamborghini"
              />
              <span>Lamborghini</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
