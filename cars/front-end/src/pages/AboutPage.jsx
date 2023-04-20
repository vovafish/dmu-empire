import style from './AboutPage.module.scss';

const AboutPage = () => {
  return (
    <div className="mainContainer">
      <main>
        <div className="main-title">
          <h1>Welcome to Car Empire</h1>
        </div>
        <div>
          <blockquote>"Driving you to your destination in style."</blockquote>
        </div>
        <div className={style.description}>
          <p>
            Car Empire was founded in 2010 with the goal of becoming the go-to
            destination for car shoppers. Since then, we have established a
            reputation for providing high-quality vehicles and exceptional
            customer service.
          </p>
          <p>
            Our team of automotive experts has years of experience in the
            industry, and we are passionate about helping our customers find the
            perfect car for their needs. Whether you're a first-time car buyer
            or a seasoned pro, we're here to make the process as smooth and
            stress-free as possible.
          </p>
          <p>
            At Car Empire, we believe that everyone deserves to drive the car of
            their dreams. That's why we are committed to offering a wide range
            of vehicles to suit every taste and budget. From luxury sports cars
            to practical family vehicles, we've got you covered.
          </p>
          <p>
            <strong>
              Our motto is "Driving you to your destination in style."
            </strong>
            We believe that owning a car should be a source of pride and joy,
            and we are dedicated to making that a reality for each and every one
            of our customers.
          </p>
          <p>
            So why wait? Come and see us at Car Empire today and let us help you
            get behind the wheel of the car of your dreams!
          </p>
        </div>
        <p>For more information or to schedule a test drive, contact us at:</p>
        <p>
          Email: <a href="mailto:carempire@gmail.com">carempire@gmail.com</a>
        </p>
        <p>Phone: 01234567890</p>
      </main>
    </div>
  );
};

export default AboutPage;
