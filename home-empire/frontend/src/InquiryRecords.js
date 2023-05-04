import React, { useEffect, useState } from "react";
import { RequireAuth } from "./RequireAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import { UserSidebar } from "./UserSidebar";
import axios from "axios";

export const InquiryRecords = () => {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [inquiry, setInquiry] = useState([]);

  //For Auth Checking
  const navigate = useNavigate();
  const { product_id } = useParams();
  const fetchMyInquiry = async (e) => {
    try {
      const data = {
        userId: authUser.id,
      };

      const result = await axios.post(
        "http://localhost:4500/apiInquiryRecords",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(result.data.fetch_inquiries);
      // const inq_records = await result.json();
      // console.log(inq_records);
      setInquiry(result.data.fetch_inquiries);
    } catch (error) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(authUser);
    if (!isLoggedIn) {
      navigate(`/signIn`);
    } else {
      fetchMyInquiry();
    }
  }, []);
  return (
    <>
      <div className="sg-page-content">
        <section className="sg-global-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <UserSidebar></UserSidebar>
              </div>
              <div className="col-lg-9">
                <div className="sg-table sa-box mb-3">
                  <div className="title justify-content-between">
                    <h1>My Inquiries</h1>
                  </div>
                  <form className="woocommerce-cart-form" action="#">
                    <table className="table">
                      <thead></thead>
                      <tbody>
                        {inquiry &&
                          inquiry.length > 0 &&
                          inquiry.map((inquiryObj, index) => (
                            <tr>
                              <th scope="row" key={inquiryObj._id}>
                                <div className="product">
                                  <Link
                                    to={`/product/${inquiryObj.product_id}`}
                                  >
                                    <span className="product-thumb">
                                      <img
                                        src={`http://localhost:4500/assets/product_images/${inquiryObj.product_details[0].thumbnail}`}
                                        alt={
                                          inquiryObj.product_details[0].title
                                        }
                                        className="img-fluid"
                                      />
                                    </span>
                                    <div className="text">
                                      <p>
                                        {inquiryObj.product_details[0].title}
                                      </p>
                                    </div>
                                  </Link>
                                </div>
                                {/* /.product */}
                              </th>
                              <td>
                                {inquiryObj.received_date},{" "}
                                {inquiryObj.received_time}
                              </td>
                              <td>Inquiry: {inquiryObj.inquiry_message}</td>
                              <td>
                                Admin Response:{" "}
                                {(inquiryObj.admin_response)? inquiryObj.admin_response : "No Response"}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </section>
        {/* /.profile-section */}
      </div>
    </>
  );
};
