import React from "react";
import { Link } from "react-router-dom";

export const UserSidebar = () => {
  return (
    <div className="sidebar-menu">
      <ul className="global-list">
        <li>
          <Link to={`/userProfile`}>
            <span>
              <i className="fa-regular fa-user" />
            </span>{" "}
            My Profile
          </Link>
        </li>
        <li>
          <Link to={`/inqiryRecords`}>
            <span>
              <i className="fa-regular fa-shopping-cart" />
            </span>{" "}
            Inquiry
          </Link>
        </li>
        <li>
          <Link to={`/changePassword`}>
            <span>
              <i className="fa-solid fa-lock" />
            </span>{" "}
            Change Password
          </Link>
        </li>
        <li>
          <Link to={`/signOut`}>
            <span>
              <i className="fa-solid fa-arrow-right-from-bracket" />
            </span>{" "}
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
