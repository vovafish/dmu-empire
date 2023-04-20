import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import style from './ReturnOfVehiclePage.module.scss';

const ReturnOfVehiclePage = () => {
  const [showMessage, setShowMessage] = useState(false);

  const form = useRef();

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
      <main>
        <h1 className="main-title">Return of Vehucle Page</h1>
        {console.log(showMessage)}
        {!showMessage ? (
          <form ref={form} onSubmit={sendEmail} className={style.form}>
            <div>
              <label for="name">Name</label>
              <input type="text" name="user_name" id="name" />
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" name="user_email" id="email" />
            </div>
            <div>
              <label for="message">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Describe the issue in details"
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
          </>
        )}
      </main>
    </div>
  );
};

export default ReturnOfVehiclePage;
