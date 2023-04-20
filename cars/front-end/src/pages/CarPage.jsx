/* 
Importing all the needs:
Hooks from React
axios library - serves to create HTTP request
NotFoundPage page
Styling file
*/
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import emailjs from '@emailjs/browser';
import style from './CarPage.module.scss';
import { useUser } from '../auth/useUser';

const CarPage = () => {
  //making vars to track state of carInfo (API response from mongodb)
  const [carInfo, setCarInfo] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //to access the carID of each car object
  const { carId } = useParams();

  const form = useRef();

  const user = useUser();

  const handlePurchase = () => {
    setModalIsOpen(true);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_2ed9u5h',
        'template_1luleui',
        form.current,
        'wa_301WBehLKeEt_a'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setModalIsOpen(false);
  };

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/cars/${carInfo.name}`);
      // Reload the page to update the list of cars
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  /* 
  Create affect that run when carId var being used.
  It gets the response from the specific http
  Then getting reponse data into newCarInfo
  and updating the state of the carInfo
  */
  useEffect(() => {
    const loadCarInfo = async () => {
      const response = await axios.get(`/api/cars/${carId}`);
      const newCarInfo = response.data;
      setCarInfo(newCarInfo);
    };
    loadCarInfo();
  }, [carId]);

  //if carInfo is empty/ no car then return to the NotFoundPagew
  if (!carInfo) {
    return <NotFoundPage />;
  }

  /* Creating the HTML that will be displayed when navigate to the CarPage */
  return (
    //creating main container
    <div className={style.block}>
      <div className="mainContainer">
        <main className={style.main}>
          <div className={style.mainImage}>
            <img
              src={
                carInfo.image
                  ? carInfo.image
                  : require(`../img/cars/${carInfo.title}.jpg`)
              }
              alt={carInfo.name}
              style={{ width: '200px' }}
            />
          </div>
          <div className={style.mainInfo}>
            <h2>
              This is brand new {carInfo.name} and been menufactured in{' '}
              {carInfo.year}
            </h2>
            <p>Color: {carInfo.colour}</p>
            <p>Gearbox type: {carInfo.gearbox}</p>
            <p>Weight: {carInfo.weight} kg.</p>
            <p>Mileage: {carInfo.mileage} miles</p>
            <p>Type of Fuel: {carInfo.fuel_type}</p>
            <p>Fuel consumption: {carInfo.fuel_consumption}</p>
            <p>Type of Body: {carInfo.body_type}</p>
            <p>Size of engine: {carInfo.engine_size}</p>
            <p>
              This car have {carInfo.doors} doors & {carInfo.seats} seets
            </p>
            <p>Acceleration: {carInfo.acceleration}</p>
            <p>{carInfo.description}</p>
            <button onClick={handlePurchase}>Buy</button>
            <Modal
              isOpen={modalIsOpen}
              ariaHideApp={false}
              className={style.modal}
              style={customStyles}
            >
              <button onClick={() => setModalIsOpen(false)}>X</button>
              <form ref={form} onSubmit={sendEmail}>
                <div>
                  <label>Name</label>
                  <input type="text" name="user_name" id="name" required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" name="user_email" id="email" required />
                </div>
                <div>
                  <label>Message</label>
                  <textarea name="message" id="message" />
                </div>
                <div>
                  <label>Car</label>
                  <input
                    name="car"
                    value={carInfo.name}
                    readOnly={true}
                    id="car"
                  />
                </div>
                <div>
                  <label>Car</label>
                  <input
                    name="price"
                    value={carInfo.price}
                    readOnly={true}
                    id="price"
                  />
                </div>
                <div>
                  <input type="submit" value="Send" />
                </div>
              </form>
            </Modal>
            {user && user.isAdmin && (
              <button onClick={handleDelete}>Delete</button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

//exporing the CarPage
export default CarPage;
