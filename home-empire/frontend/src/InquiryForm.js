import React, { useEffect, useState } from "react";
import { RequireAuth } from "./RequireAuth";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { UserSidebar } from "./UserSidebar";
import axios from "axios";

export const InquiryForm = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [message, setMessage] = useState("");

  //For Auth Checking
    const navigate = useNavigate();
    const { product_id } = useParams();
  const submit = async (e) => {
    e.preventDefault();
    //console.log("Submit Clicked");
    try {
      if (message !== "") {
        const data = {
          userId: authUser.id,
          product_id: product_id,
          message: message,
        };

        const SendInquiry = await axios.post(
          "http://localhost:4500/apiSendInquiry",
          data,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setMessage("");
        alert("Inquiry Sent Successfully");

      }
    } catch (error) {
      console.log(e);
    }
  };

  useEffect(() => {
    //console.log(authUser);
    if (!isLoggedIn) {
      navigate(`/signIn`);
    }
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="edit-profile-box sa-box">
            <div className="sg-card">
              <form
                className="ragister-form"
                name="ragister-form"
                method="post"
                action=""
              >
                <div className="form-group">
                  <label>Inquiry Message</label>
                  <textarea
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    required="required"
                    placeholder="Enter Text Here"
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  name="sub"
                  value="submit"
                  className="btn btn-primary"
                  onClick={submit}
                >
                  Send Inquiry
                </button>
              </form>
              {/* /.contact-form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
