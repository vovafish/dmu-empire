
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Shop() {
  const { cat_id } = useParams();

  const [subcategory, setSubcategory] = useState([]);
  const [product, setProduct] = useState([]);
  const fetchSubcatTree = async () => {
    
    const subCatBycat = await fetch(
      `http://localhost:4500/subcategory/api/${cat_id}`
    );
    const subcatagory_records = await subCatBycat.json();
    //console.log(subcatagory_records);
    setSubcategory(subcatagory_records.fetch_subcategory);

    const productBycat = await fetch(
      `http://localhost:4500/product/api/cat/${cat_id}`
    );
    const product_records = await productBycat.json();
    setProduct(product_records.fetch_product);
    
  };
  useEffect(() => {
    fetchSubcatTree();
    
  }, [cat_id]);
  return (
    <>
      <div className="sg-page-content">
        <section className="grid-view-tab">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-3">
                <div className="sg-sitebar sa-box">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <div className="accordion-header" id="ac1">
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse1"
                          aria-expanded="true"
                          aria-controls="collapse1"
                        >
                          Subcategories
                        </button>
                      </div>
                      <ul className="global-list">
                        {subcategory &&
                          subcategory.length > 0 &&
                          subcategory.map((subcategoryObj, index) => (
                            <li key={subcategoryObj._id}>
                              <Link to={"/"}>
                                {subcategoryObj.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                  {/* /.accordion */}
                </div>
                {/* /.sg-sitebar */}{" "}
              </div>
              <div className="col-md-8 col-lg-9">
                <div className="sg-category-content sg-filter sa-box mb-3">
                  <ul className="products grid-4">
                    {product &&
                      product.length > 0 &&
                      product.map((productObj, index) => (
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
                {/* /.sg-category-content */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container */}
        </section>
        {/* /.category-section */}
      </div>
      {/* /.sg-page-content */}
    </>
  );
}

export default Shop;
