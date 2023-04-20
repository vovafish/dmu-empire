import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../auth/useUser';
import Modal from 'react-modal';
import axios from 'axios';
import style from './CarsListPage.module.scss';

const CarsListPage = () => {
  const [carsInfo, setCarsInfo] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [nameValue, setNameValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [yearValue, setYearValue] = useState('');
  const [originValue, setOriginValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [mileageValue, setMileageValue] = useState('');
  const [gearboxValue, setGearboxValue] = useState('');
  const [fuelTypeValue, setFuelTypeValue] = useState('');
  const [colourValue, setColourValue] = useState('');
  const [bodyTypeValue, setBodyTypeValue] = useState('');
  const [engineSizeValue, setEngineSizeValue] = useState('');
  const [doorsValue, setDoorsValue] = useState('');
  const [seatsValue, setSeatsValue] = useState('');
  const [accelerationValue, setAccelerationValue] = useState('');
  const [fuelConsumptionValue, setFuelConsumptionValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [admin, setAdmin] = useState(false);

  const user = useUser();

  /*  if (user === null) {
    setAdmin(false);
  } else {
    setAdmin(true);
  } */

  console.log(user);
  useEffect(() => {
    const loadCarsInfo = async () => {
      const response = await axios.get('/api/cars');
      const newCarsInfo = response.data;
      setCarsInfo(newCarsInfo);
    };
    loadCarsInfo();
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '21px',
      backgroundColor: 'azure',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const onInsertCar = async () => {
    setModalIsOpen(false);
    await axios.post('/api/cars', {
      name: nameValue,
      title: titleValue,
      year: yearValue,
      origin: originValue,
      weight: weightValue,
      mileage: mileageValue,
      gearbox: gearboxValue,
      fuel_type: fuelTypeValue,
      colour: colourValue,
      body_type: bodyTypeValue,
      engine_size: engineSizeValue,
      doors: doorsValue,
      seats: seatsValue,
      acceleration: accelerationValue,
      fuel_consumption: fuelConsumptionValue,
      description: descriptionValue,
      price: priceValue,
      image: imageValue,
    });
  };

  const handleInsert = () => {
    setModalIsOpen(true);
  };

  return (
    <div className={style.bg}>
      <div className="mainContainer">
        <main className={style.main}>
          <h1 className="main-title light">Cars</h1>
          {user && user.isAdmin && (
            <button className={style.insert} onClick={handleInsert}>
              Insert
            </button>
          )}
          <Modal
            isOpen={modalIsOpen}
            ariaHideApp={false}
            className={style.modal}
            style={customStyles}
          >
            <button className={style.btn} onClick={() => setModalIsOpen(false)}>
              X
            </button>
            <div className={style.insertForm}>
              <div className={style.column}>
                <div className={style.field}>
                  <label>Name</label>
                  <input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Title</label>
                  <input
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Year</label>
                  <input
                    value={yearValue}
                    onChange={(e) => setYearValue(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className={style.field}>
                  <label>Origin</label>
                  <input
                    value={originValue}
                    onChange={(e) => setOriginValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Weight</label>
                  <input
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Mileage</label>
                  <input
                    value={mileageValue}
                    onChange={(e) => setMileageValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className={style.column}>
                <div className={style.field}>
                  <label>Gearbox</label>
                  <input
                    value={gearboxValue}
                    onChange={(e) => setGearboxValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Fuel Type</label>
                  <input
                    value={fuelTypeValue}
                    onChange={(e) => setFuelTypeValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Colour</label>
                  <input
                    value={colourValue}
                    onChange={(e) => setColourValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Body Type</label>
                  <input
                    value={bodyTypeValue}
                    onChange={(e) => setBodyTypeValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Engine Size</label>
                  <input
                    value={engineSizeValue}
                    onChange={(e) => setEngineSizeValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Doors</label>
                  <input
                    value={doorsValue}
                    onChange={(e) => setDoorsValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className={style.column}>
                <div className={style.field}>
                  <label>Seats</label>
                  <input
                    value={seatsValue}
                    onChange={(e) => setSeatsValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Acceleration</label>
                  <input
                    value={accelerationValue}
                    onChange={(e) => setAccelerationValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Fuel Consumption</label>
                  <input
                    value={fuelConsumptionValue}
                    onChange={(e) => setFuelConsumptionValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Description</label>
                  <input
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Price</label>
                  <input
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className={style.field}>
                  <label>Image</label>
                  <input
                    value={imageValue}
                    onChange={(e) => setImageValue(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>
            </div>
            <button
              className={style.btn}
              onClick={onInsertCar}
              disabled={
                !nameValue ||
                !titleValue ||
                !yearValue ||
                !originValue ||
                !weightValue ||
                !mileageValue ||
                !gearboxValue ||
                !fuelTypeValue ||
                !colourValue ||
                !bodyTypeValue ||
                !engineSizeValue ||
                !doorsValue ||
                !seatsValue ||
                !accelerationValue ||
                !fuelConsumptionValue ||
                !descriptionValue ||
                !priceValue ||
                !imageValue
              }
            >
              Add new car
            </button>
          </Modal>
          <div className={style.container}>
            {carsInfo.map((car) => (
              <Link to={`/cars/${car.name}`} key={car._id}>
                <div className={style.card} key={car._id}>
                  <h3>{car.name}</h3>
                  <p>{car.body_type}</p>
                  <p>Manufactured: {car.origin}</p>
                  <p>{car.year}</p>
                  <p>£{car.price}</p>
                  <img
                    //src={require(`../img/cars/${car.title}.jpg`)}
                    src={
                      car.image
                        ? car.image
                        : require(`../img/cars/${car.title}.jpg`)
                    }
                    alt={car.name}
                  />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CarsListPage;
