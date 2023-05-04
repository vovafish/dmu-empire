function Contact() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mt-3">
          <h4>Contact Us</h4>
          <form action>
            <div className="mb-3">
              <label htmlFor="formName" className="form-label">
                Enter Name
              </label>
              <input
                type="text"
                className="form-control"
                id="formName"
                placeholder="Example input placeholder"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formEmail" className="form-label">
                Enter Email
              </label>
              <input
                type="text"
                className="form-control"
                id="formEmail"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formPhone" className="form-label">
                Enter Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="formPhone"
                placeholder="Enter Phone"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formSubject" className="form-label">
                Enter Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="formSubject"
                placeholder="Enter Subject"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formMessage" className="form-label">
                Enter Message
              </label>
              <input
                type="text"
                className="form-control"
                id="formMessage"
                placeholder="Enter Message"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="form-control btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 mt-3">
          <h4>Home Empire</h4>
          <p>Address: Sample Address Text</p>
          <p>City State Zip Country</p>
          <p>Email1: email1@home-empire.com</p>
          <p>Email2: email2@home-empire.com</p>
          <p>Phone1: 1234567890</p>
          <p>Phone2: 0987654321</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
