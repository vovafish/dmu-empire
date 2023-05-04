import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

export const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    //console.log("Submit Clicked")
    try {
      if (
        firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        password !== "" &&
        password === rpassword &&
        phone !== "" &&
        dob !== ""
      ) {
        const data = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          phone_number: phone,
          dob: dob,
        };

        const createUser = await axios.post(
          "http://localhost:4500/apiSignUp",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        //console.log(createUser);
        if (createUser.data.token) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setRpassword("");
          setPhone("");
          setDOB("");
          alert("Registration Successful!");
          navigate(`/signin`);
        }

        //const token = createUser.data.token;
        // const cookies = new Cookies();
        // cookies.set("jwt_authorization", token, {
        //     expires:new Date(Date.now() + 1000*60*60), httpOnly:true
        // });
        // const result = await createUser.json();
        // console.log(result);
      }
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="sg-page-content">
        <section className="ragister-account text-center">
          <div className="container">
            <div className="account-content">
              <div className="thumb">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_13.png"
                  alt="Image"
                  className="img-fluid"
                />
              </div>
              <div className="form-content">
                <h1>Sign Up</h1>
                <p>Sign up to continue shopping</p>
                <form
                  className="ragister-form"
                  name="ragister_form"
                  method="post"
                  action=""
                >
                  <div className="form-group">
                    <span className="mdi mdi-name mdi-account-outline" />
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      placeholder="First Name"
                      defaultValue=""
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>

                  <div className="form-group">
                    <span className="mdi mdi-name mdi-account-outline" />
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      placeholder="Last Name"
                      defaultValue=""
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>

                  <div className="form-group">
                    <span className="mdi mdi-name mdi-email-outline" />
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      defaultValue=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>
                  <div className="form-group">
                    <span className="mdi mdi-name mdi-lock-outline" />
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>
                  <div className="form-group">
                    <span className="mdi mdi-name mdi-lock-outline" />
                    <input
                      type="password"
                      name="rpassword"
                      className="form-control"
                      placeholder="Repeat Password"
                      onChange={(e) => setRpassword(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>

                  <div className="form-group">
                    <span className="mdi mdi-name mdi-account-outline" />
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Enter Phone"
                      defaultValue=""
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>

                  <div className="form-group">
                    <span className="mdi mdi-name mdi-account-outline" />
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      placeholder="Enter Date of Birth"
                      defaultValue=""
                      onChange={(e) => setDOB(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>

                  <button
                    type="submit"
                    className="btn"
                    name="sub"
                    value="submit"
                    onClick={submit}
                  >
                    Sign Up
                  </button>
                  <p>
                    I have an account? <Link to={"/signin"}>Sign in</Link>
                  </p>
                </form>
                {/* /.contact-form */}
              </div>
            </div>
            {/* /.account-content */}
          </div>
          {/* /.container */}
        </section>
        {/* /.ragister-account */}
      </div>
      {/* /.sg-page-content */}
    </>
  );
};
