import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { useAuth } from "./Contexts/AuthContext";


export const Login = () => {

     const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();






    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
      e.preventDefault();
      console.log("Submit Clicked");
      try {
        if (
          email !== "" &&
          password !== ""
        ) {
          const data = {
            email: email,
            password: password,
          };

          const loginUser = await axios.post(
            "http://localhost:4500/apiSignIn",
            data,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          console.log(loginUser);
            if (loginUser.data.token) {
              const token = loginUser.data.token;
            //   const cookies = new Cookies();
            //   cookies.set("jwt_authorization", token, {
            //     expires: new Date(Date.now() + 1000 * 60 * 60)
            //   });
                localStorage.setItem("jwt_authorization", token);
              setEmail("");
                setPassword("");
                
                //Setting Context
                setIsLoggedIn(true);
                const decoded = jwt(token);
                setAuthUser(decoded);

              alert("Login Successful!");
              navigate(`/`);
            }

        //   const token = createUser.data.token;
        //   const cookies = new Cookies();
        //   cookies.set("jwt_authorization", token, {
        //       expires:new Date(Date.now() + 1000*60*60), httpOnly:true
        //   });
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
                <h1>Sign in</h1>
                <p>Sign in to continue shopping</p>
                <form
                  className="ragister-form"
                  name="login_form"
                  method="post"
                  action=""
                >
                  <div className="form-group">
                    <span className="mdi mdi-name mdi-email-outline" />
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      defaultValue=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>
                  <div className=" form-group">
                    <span className="mdi mdi-name mdi-lock-outline" />
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      defaultValue=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p style={{ color: "red" }} />
                  </div>
                  <div className=" middle-content d-flex">
                    <a href="#">Forgot your password?</a>
                  </div>
                  <button
                    type="submit"
                    name="sub"
                    value="login"
                    className="btn"
                    onClick={submit}
                  >
                    Sign In
                  </button>
                  <p>
                    Don't have an account? <Link to={`/signup`}>Sign Up</Link>
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
}