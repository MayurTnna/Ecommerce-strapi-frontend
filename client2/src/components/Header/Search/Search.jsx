import "./Search.scss";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import star from "../../../assets/star/star.svg";
import { useNavigate, useParams } from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
const Search = ({ showSearch, setShowSearch, query }) => {
  const [isVerticalCard, setIsVerticalCard] = React.useState(false);
  const [isData, setIsData] = useState([]);
  const { id } = useParams();
  React.useEffect(() => {
    const handleResize = () => {
      setIsVerticalCard(window.innerWidth <= 400);
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate();

  let { data } = UseFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  // useEffect(() => {
  //   if (data) {
  //     setIsData(data);
  //   }
  // }, [data]);

  console.log(data);

  console.log(query);
  if (!data) {
    data = null;
  }

  return (
    <>
      <div className="main-display-container"></div>
      <Modal
        show={showSearch}
        onHide={setShowSearch}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="text-sucess">
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-auto">
            {data &&
              data?.data?.map((item) => (
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 mb-4">
                  <Card
                    onClick={() => {
                      navigate("/product/" + item.id);
                      setShowSearch(false);
                    }}
                    size="lg"
                    key={item.id}
                    variant="plain"
                    orientation={isVerticalCard ? "vertical" : "horizontal"}
                    sx={{
                      textAlign: "center",
                      maxWidth: "100%",
                      width: 500,
                      // to make the demo resizable
                      resize: "horizontal",
                    }}
                  >
                    <CardOverflow
                      variant="solid"
                      sx={{
                        flex: "0 0 200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: "var(--Card-padding)",
                        backgroundImage: `url(${
                          process.env.REACT_APP_DEV_URL +
                          item.attributes.img.data[0].attributes.url
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "grey",

                        width: `${isVerticalCard ? "100%" : "500px"}`,
                      }}
                    >
                      <Typography
                        fontSize="x12"
                        fontWeight="xl"
                        textColor="#fff"
                        className="d-flex align-items-center justify-content-center star-text"
                      >
                        <div>4.6</div>{" "}
                        <img src={star} alt="star" className="mb-1" />
                      </Typography>
                    </CardOverflow>
                    <CardContent sx={{ gap: 1.5, minWidth: 300 }}>
                      <CardContent>
                        <div className="right-disp-container">
                          <div className="title-text">
                            {item.attributes.title}
                          </div>
                          <div className="price-main">
                            <span className="discounted-price">$3000</span>
                            <span className="original-price">$4500</span>
                          </div>
                          <div className="product-description">
                            {item.attributes.desc}
                          </div>
                        </div>
                      </CardContent>
                      <button className="add-to-cart-btn">Add to cart</button>
                    </CardContent>
                  </Card>
                </div>
              ))}{" "}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
