import style from './AdditionalItemPage.module.scss';

const AdditionalItemPage = () => {
  return (
    <>
      <div className="mainContainer">
        <main>
          <div>
            <h1 className="main-title">Extras for your car</h1>
            <div className={style.card}>
              <div>
                <img
                  src="https://m.media-amazon.com/images/I/41xPDjDGLCL._AC_.jpg"
                  alt="Car window tinting"
                />
              </div>
              <div>
                <p>Car window tinting</p>
                <p>Price: 13.99£</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdditionalItemPage;
