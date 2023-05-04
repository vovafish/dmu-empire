import { Link } from "react-router-dom";

function Footer() {
    return (
      <>
        <footer className="footer-section">
          <div className="container">
            <div className="footer-top">
              <div className="row">
                <div className="col-md-6 col-lg-3">
                  <div className="footer-widget">
                    <h3>About</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sed, ipsum rem. Voluptas earum, aut ullam, vero officia
                      consectetur dolores! Illum impedit distinctio, esse quae
                      animi. Fugiat sequi libero temporibus.
                    </p>
                    <div className="social">
                      <ul className="global-list">
                        <li>
                          <Link to={"/"}>
                            <span>
                              <i className="fa-brands fa-facebook" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <span>
                              <i className="fa-brands fa-twitter" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <span>
                              <i className="fa-brands fa-linkedin" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <span>
                              <i className="fa-brands fa-instagram" />
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/"}>
                            <span>
                              <i className="fa-brands fa-pinterest" />
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget">
                    <h3>Useful Links</h3>
                    <ul className="global-list">
                      <li>
                        
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        <Link to={"/about"}>About</Link>
                      </li>
                      <li>
                        <Link to={"/contact"}>Contact Us</Link>
                      </li>
                      <li>
                        <Link to={"/signIn"}>Sign In</Link>
                      </li>
                      <li>
                        <Link to={"/signUp"}>Sign Up</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget">
                    <h3>My Account</h3>
                    <ul className="global-list">
                      <li>
                        <Link to={"/"}>Login</Link>
                      </li>
                      <li>
                        <Link to={"/"}>Register</Link>
                      </li>
                      <li>
                        <Link to={"/"}>Categories</Link>
                      </li>
                      <li>
                        <Link to={"/"}>Products</Link>
                      </li>
                      <li>
                        <Link to={"/"}>Subcategories</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="footer-widget">
                    <h3>Contact Us</h3>
                    <div className="address">
                      <ul className="global-list">
                        <li>
                          <span>
                            <i className="fa-solid fa-location-dot" />
                          </span>
                          Level 1, 244 Smith Street,
                          <br />
                          Fitzroy Vic 3065 AU{" "}
                        </li>
                        <li>
                          <span>
                            <i className="fa-solid fa-phone" />
                          </span>
                          <Link href="tel:008801957145399">008801957145399</Link>
                        </li>
                        <li>
                          <span>
                            <i className="fa-regular fa-envelope" />
                          </span>
                          <Link to={"/"}>support@gmail.com</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2">
                  <div className="footer-widget">
                    <h3>We Accept</h3>
                    <div className="payment-card">
                      <img
                        src="http://localhost:4500/assets/front/images/card1.png"
                        alt="Image"
                        className="img-fluid m-1"
                      />

                      <img
                        src="http://localhost:4500/assets/front/images/card2.png"
                        alt="Image"
                        className="img-fluid m-1"
                      />

                      <img
                        src="http://localhost:4500/assets/front/images/card3.png"
                        alt="Image"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
}

export default Footer;