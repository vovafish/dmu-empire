import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import style from './ReturnOfVehiclePage.module.scss';
import { Link } from 'react-router-dom';

// Define component called ReturnOfVehiclePage
const ReturnOfVehiclePage = () => {
  // Set up a state variable called showMessage and its corresponding function setShowMessage with a default value of false
  const [showMessage, setShowMessage] = useState(false);

  // Set up a reference to a form element called form
  const form = useRef();

  // Define a function called sendEmail that prevents the default form submission behavior, sets showMessage to true, and uses the emailjs library to send the form data as an email
  const sendEmail = (e) => {
    e.preventDefault();
    setShowMessage(true);
    emailjs
      .sendForm(
        'service_8lfvu6w',
        'template_e7yl9tj',
        form.current,
        'OobbSW-DHtFMhWbqK'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="mainContainer">
      <main className={style.main}>
        <h1 className="main-title">Return of Vehucle Page</h1>
        {!showMessage ? (
          <form ref={form} onSubmit={sendEmail} className={style.form}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" name="user_name" id="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="user_email" id="email" required />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Describe the issue in details"
                required
              />
            </div>
            <div>
              <input type="submit" value="Send" />
            </div>
          </form>
        ) : (
          <>
            <h2>Thanks for your request!</h2>
            <p>One our agents will contact you soon</p>
            <button>
              <Link to="/cars">Explore more</Link>
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default ReturnOfVehiclePage;
