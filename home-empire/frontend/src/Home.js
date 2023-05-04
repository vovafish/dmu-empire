import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const fetchCatTree = async () => {
    const result = await fetch("http://localhost:4500/category/api");
    const cetagory_records = await result.json();
    setCategory(cetagory_records.fetch_category);
  };

  const fetchAllProducts = async () => {
    const products = await fetch(
      `http://localhost:4500/product/api`
    );
    const product_records = await products.json();
    setProduct(product_records.fetch_product);
  };

  useEffect(() => {
    fetchAllProducts();
    //console.log(category);
  }, []);
  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <div
            id="hero-slider"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div
                className="carousel-item active"
                style={{
                  backgroundImage:
                    "url(http://localhost:4500/assets/front/slider/10_1.jpg)",
                }}
              >
                <div className="container">
                  <div className="item-content">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="thumb animated slideInLeft">
                          <img
                            src="http://localhost:4500/assets/front/slider/10.png"
                            alt="Image"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-8 align-self-center">
                        <div className="hero-text text-right">
                          <h2 className="animated slideInUp">
                            New Winter Collections 2022
                          </h2>
                          <h3 className="animated slideInUp">
                            Upto 50% Discount
                          </h3>
                          <Link
                            to={`/product/644d5312c517d8772a6515f5`}
                            className="btn btn-primary animated slideInUp"
                          >
                            shop now{" "}
                            <span className="fa-solid fa-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /.row */}
                  </div>
                  {/* /.item-content */}
                </div>
                {/* /.container */}
              </div>
              <div
                className="carousel-item "
                style={{
                  backgroundImage:
                    "url(http://localhost:4500/assets/front/slider/11_1.jpg)",
                }}
              >
                <div className="container">
                  <div className="item-content">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="thumb animated slideInLeft">
                          <img
                            src="http://localhost:4500/assets/front/slider/11.png"
                            alt="Image"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-8 align-self-center">
                        <div className="hero-text text-right">
                          <h2 className="animated slideInUp">
                            Attack Air VaporMax Flyknit 3
                          </h2>
                          <h3 className="animated slideInUp">
                            Flat 20% Discount
                          </h3>
                          <Link
                            to={`/product/644c3700bee2984ae8709c7d`}
                            className="btn btn-primary animated slideInUp"
                          >
                            shop now{" "}
                            <span className="fa-solid fa-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /.row */}
                  </div>
                  {/* /.item-content */}
                </div>
                {/* /.container */}
              </div>
              <div
                className="carousel-item "
                style={{
                  backgroundImage:
                    "url(http://localhost:4500/assets/front/slider/12_1.jpg)",
                }}
              >
                <div className="container">
                  <div className="item-content">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="thumb animated slideInLeft">
                          <img
                            src="http://localhost:4500/assets/front/slider/12.png"
                            alt="Image"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-8 align-self-center">
                        <div className="hero-text text-right">
                          <h2 className="animated slideInUp">
                            BLACK SMART WATCH
                          </h2>
                          <h3 className="animated slideInUp">
                            upto 50% Discount
                          </h3>
                          <Link
                            to={`/product/644d53edc517d8772a651607`}
                            className="btn btn-primary animated slideInUp"
                          >
                            shop now{" "}
                            <span className="fa-solid fa-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /.row */}
                  </div>
                  {/* /.item-content */}
                </div>
                {/* /.container */}
              </div>
            </div>
            {/* /.carousel-inner */}
            <ol className="carousel-indicators">
              <li
                data-bs-target="#hero-slider"
                data-bs-slide-to={0}
                className="active"
              />
              <li data-bs-target="#hero-slider" data-bs-slide-to={1} />
              <li data-bs-target="#hero-slider" data-bs-slide-to={2} />
            </ol>
          </div>
          {/* /.hero-content */}
        </div>
        {/* /.hero-content */}
      </div>
      {/* /.hero-section */}
      <section className="offers-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to={`/category/644098a5978f525fa7ff4f06`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_5.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`/category/644b78ff84dbe84db0d97398`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_6.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={`/category/644d1920fbb457c5e2bc6227`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_7.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
      {/* /.section */}
      <section className="categories-section pt-0">
        <div className="container">
          <div className="title justify-content-between">
            <h1>Popular Categories</h1>
            <a href="#">
              All Categories <span className="icon fas fa-arrow-right" />
            </a>
          </div>
          <div className="category-content">
            <ul className="global-list grid-3">
              {category &&
                category.length > 0 &&
                category.slice(0, 9).map((categoryObj, index) => (
                  <li key={categoryObj._id}>
                    <Link to={`/category/${categoryObj._id}`}>
                      <span className="icon">
                        <img
                          src={`http://localhost:4500/assets/category_images/${categoryObj.image}`}
                          alt={categoryObj.title}
                          className="img-fluid"
                        />
                      </span>
                      <span>{categoryObj.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        {/* /.container */}
      </section>
      {/* /.section */}
      <section className="offers-section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to={`/category/644d194afbb457c5e2bc622d`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_8.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-3">
              <Link to={`/category/644d195ffbb457c5e2bc6230`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_9.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-3">
              <Link to={`/category/644d1973fbb457c5e2bc6233`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_10.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-md-3">
              <Link to={`/category/644d19f5fbb457c5e2bc6239`} className="add-banner">
                <img
                  src="http://localhost:4500/assets/front/page-images/1_11.jpg"
                  alt="Image"
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
      </section>
      {/* /.offers-section */}
      <section
        className="cta-section"
        style={{
          backgroundImage:
            "url(http://localhost:4500/assets/front/page-images/1_12.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="cta-text">
                <h1>Big Sale Up To 70% Off</h1>
                <p>Exclussive Offers For Limited Time</p>
                <Link to={`/category/644d19e3fbb457c5e2bc6236`} className="btn btn-primary">
                  EXPLORE YOUR ORDER
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* /.container */}
      </section>
      {/* /.cta-section */}
      <section className="products-section">
        <div className="container">
          <div className="sa-box">
            <div className="title justify-content-between">
              <h1>Best Selling Product</h1>
            </div>
            <ul className="products grid-6">
              {product &&
                product.length > 0 &&
                product.slice(0,12).map((productObj, index) => (
                  <li key={productObj._id}>
                    <div className="sg-product">
                      <div className="product-thumb">
                        <Link to={`/product/${productObj._id}`}>
                          <img
                            src={`http://localhost:4500/assets/product_images/${productObj.thumbnail}`}
                            alt="Image"
                            className="img-fluid"
                          />
                        </Link>
                      </div>
                      <div className="product-info">
                        <span className="price">£{productObj.price}</span>
                        <h3>
                          <Link to={`/product/${productObj._id}`}>
                            {productObj.title}
                          </Link>
                        </h3>
                      </div>
                    </div>
                    {/* /.sg-product */}
                  </li>
                ))}
            </ul>
          </div>
          {/* /.sa-box */}
        </div>
        {/* /.container */}
      </section>
      {/* /.section */}
      {/* /.product-section */}
    </>
  );
}

export default Home;
