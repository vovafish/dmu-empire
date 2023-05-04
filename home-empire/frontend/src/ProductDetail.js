import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import { InquiryForm } from "./InquiryForm";
import axios from "axios";

function ProductDetail() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const { product_id } = useParams();
  const [product, setProduct] = useState([]);
  const fetchProductTree = async () => {
    const result = await fetch(
      `http://localhost:4500/product/api/findproduct/${product_id}`
    );
    const product_records = await result.json();
    //console.log(product_records);
    setProduct(product_records.fetch_product);
  };
  useEffect(() => {
    fetchProductTree();
  }, []);
  return (
    <>
      <div className="sg-page-content">
        <section className="product-details pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="sa-box">
                  {product && product.length > 0 && product[0].thumbnail ? (
                    <div>
                      <img
                        className="img-fluid"
                        src={`http://localhost:4500/assets/product_images/${product[0].thumbnail}`}
                        alt="Image"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-lg-7">
                {product && product.length > 0 && product[0].thumbnail ? (
                  <div className="products-details-info sa-box">
                    <h3>{product[0].title}</h3>
                    <div className="price">
                      <h4>£{product[0].price}</h4>
                    </div>
                    <div>{product[0].description}</div>
                    {!isLoggedIn ? (
                      <div className="buttons">
                        <Link to={'/signIn'} className="btn btn-primary">
                          <span className="mdi mdi-shopping-outline" />
                          Login to Send Inquiry
                        </Link>
                      </div>
                    ) : (
                        <InquiryForm></InquiryForm>
                    )}

                    <h4>More Images</h4>
                    <div>
                      {product[0].image1 && product[0].image1 ? (
                        <img
                          src={`http://localhost:4500/assets/product_images/${product[0].image1}`}
                          alt="I1"
                          className="img-fluid m-1"
                        />
                      ) : (
                        ""
                      )}

                      {product && product.length > 0 && product[0].image2 ? (
                        <img
                          src={`http://localhost:4500/assets/product_images/${product[0].image2}`}
                          alt="I2"
                          className="img-fluid m-1"
                        />
                      ) : (
                        ""
                      )}

                      {product && product.length > 0 && product[0].image3 ? (
                        <img
                          src={`http://localhost:4500/assets/product_images/${product[0].image3}`}
                          alt="I3"
                          className="img-fluid m-1"
                        />
                      ) : (
                        ""
                      )}

                      {product && product.length > 0 && product[0].image4 ? (
                        <img
                          src={`http://localhost:4500/assets/product_images/${product[0].image4}`}
                          alt="I4"
                          className="img-fluid m-1"
                        />
                      ) : (
                        ""
                      )}

                      {product && product.length > 0 && product[0].image5 ? (
                        <img
                          src={`http://localhost:4500/assets/product_images/${product[0].image5}`}
                          alt="I5"
                          className="img-fluid m-1"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {/* /.products-details-info */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </section>
        {/* /.product-details */}
      </div>
      {/* /.sg-page-content */}
    </>
  );
}

export default ProductDetail;
