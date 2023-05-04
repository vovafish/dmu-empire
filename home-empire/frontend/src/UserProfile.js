import React, { useEffect } from "react";
import { RequireAuth } from "./RequireAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { UserSidebar } from "./UserSidebar";

function UserProfile() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  //For Auth Checking
  const navigate = useNavigate();
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
              <div className="row">
                <div className="col-md-12">
                  <div className="profile-info">
                    <div className="profile-list">
                      <ul className="global-list">
                        <li>
                          First Name
                          <h5>{authUser.first_name}</h5>
                        </li>
                        <li>
                          Last Name
                          <h5>{authUser.last_name}</h5>
                        </li>
                        <li>
                          Email
                          <h5>{authUser.email}</h5>
                        </li>
                        <li>
                          Phone
                          <h5>{authUser.phone_number}</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.row */}
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
    </>
  );
}

export default UserProfile;
