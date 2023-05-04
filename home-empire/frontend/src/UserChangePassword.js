import React, { useEffect, useState } from "react";
import { RequireAuth } from "./RequireAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { UserSidebar } from "./UserSidebar";
import axios from "axios";

function UserChangePassword() {
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
    
    const [oldpassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");

  //For Auth Checking
    const navigate = useNavigate();
    const submit = async (e) => {
      e.preventDefault();
      console.log("Submit Clicked");
      try {
        if (oldpassword !== "" && password !== "" && password === rpassword) {
          const data = {
            userId: authUser.id,
            password: password,
          };

          const changePassword = await axios.post(
            "http://localhost:4500/apiChangePass",
            data,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
            setOldPassword("");
            setPassword("");
            setRPassword("");
            alert("Pssword Changed Successfully");
            navigate(`/changePassword`);

          console.log(changePassword);
          
        }
      } catch (error) {
        console.log(e);
      }
    };





  useEffect(() => {
    console.log(authUser);
    if (!isLoggedIn) {
      navigate(`/signIn`);
    }
  }, []);
  return (
    <>
      <section className="sg-global-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <UserSidebar></UserSidebar>
            </div>
            <div className="col-lg-9">
              <div className="edit-profile-box sa-box">
                <div className="title justify-content-between">
                  <h1>Change Password</h1>
                </div>
                <div className="sg-card">
                  <form
                    className="ragister-form"
                    name="ragister-form"
                    method="post"
                    action=""
                  >
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        name="oldPassword"
                        className="form-control"
                        required="required"
                        placeholder="Current Password"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="new_password"
                        className="form-control"
                        required="required"
                        placeholder="New Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        name="new_rpassword"
                        className="form-control"
                        required="required"
                        placeholder="Confirm New Password"
                        onChange={(e) => setRPassword(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      name="sub"
                      value="submit"
                      className="btn btn-primary"
                      onClick={submit}
                    >
                      Save &amp; Change
                    </button>
                  </form>
                  {/* /.contact-form */}
                </div>
              </div>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
    </>
  );
}

export default UserChangePassword;
