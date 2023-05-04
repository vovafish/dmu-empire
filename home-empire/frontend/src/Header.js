import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

function Header() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
 





  const [category, setCategory] = useState([]);
  
  //const auth = RequireAuth();
  const fetchCatTree = async () => {
    const result = await fetch("http://localhost:4500/category/api");
    const cetagory_records = await result.json();
    setCategory(cetagory_records.fetch_category);
  };
  useEffect(() => {
    fetchCatTree();
  }, []);

  return (
    <>
      <header className="sg-header">
        {/* /.sg-topbar */}
        <div className="header-middle">
          <div className="container">
            <div className="botom-content">
              <div className="sg-logo">
                <ul className="global-list d-flex">
                  <li></li>
                  <li>
                    <span>
                      <i className="fas fa-phone-volume" />
                    </span>{" "}
                    <Link to={"/"}>Customer Support: +12 345 678 99</Link>
                  </li>
                </ul>
              </div>
              <div className="sg-search">
                <Link to={"/"}>
                  <h3>HOME EMPIRE</h3>
                </Link>

                {/* /form */}
              </div>
              {/* /.sg-search */}
              <div className="user-option">
                <ul className="global-list">
                  <li>
                    {!isLoggedIn ? (
                      <>
                        <Link to={"/signIn"}>
                          <i className="far fa-user" />
                          Sign In |
                        </Link>{" "}
                        <Link to={"/signUp"}> Register</Link>
                      </>
                    ) : (
                      <>
                        <span>
                          <i className="far fa-user" />
                        </span>
                        <Link to={"/userProfile"}> My Profile</Link>{" "}
                        <Link to={"/signOut"}> Logout</Link>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /.container */}
        </div>
        {/* /.header-middle */}
        <div className="header-bottom">
          <div className="container">
            <div className="bottom-content">
              <div className="sg-categorie-menu categorie-lg align-self-lg-center">
                <div className="top-content">
                  <button className="sg-toggle">
                    <span className="toggle-bar bar1" />
                    <span className="toggle-bar bar2" />
                    <span className="toggle-bar bar3" />
                  </button>
                  <span>All Categories</span>
                </div>
                <div className="categorie-menu" id="categorie-menu">
                  <div className="categorie-menu-content">
                    <ul className="global-list">
                      {category &&
                        category.length > 0 &&
                        category.map((categoryObj, index) => (
                          <li
                            key={categoryObj._id}
                            className="sg-dropdown active"
                          >
                            <Link to={`/category/${categoryObj._id}`}>
                              <img
                                src={`http://localhost:4500/assets/category_images/${categoryObj.image}`}
                                alt="svg"
                                className="img-fluid"
                              />
                              {categoryObj.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* /.categorie-menu-content */}
                </div>
                {/* /.categorie-menu */}
              </div>
              {/* /.categorie-menu */}
              <div className="right-content">
                <div className="sg-menu">
                  <nav className="navbar navbar-expand-lg">
                    <div className="sg-logo">
                      <Link to={"/"}>
                        <h3>HOME EMPIRE</h3>
                      </Link>
                    </div>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon">
                        <i className="fa-solid fa-bars" />
                      </span>
                    </button>
                    <div
                      className="collapse navbar-collapse justify-content-end"
                      id="navbarNav"
                    >
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <Link to="/">Home</Link>
                        </li>
                        {category &&
                          category.length > 0 &&
                          category.slice(0, 3).map((categoryObj, index) => (
                            <li key={categoryObj._id} className="nav-item">
                              <Link to={`/category/${categoryObj._id}`}>
                                {categoryObj.title}
                              </Link>
                            </li>
                          ))}

                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* /.container */}
        </div>
        {/* /.header-bottom */}
        {/* /.categorie-menu */}
      </header>
    </>
  );
}

export default Header;
