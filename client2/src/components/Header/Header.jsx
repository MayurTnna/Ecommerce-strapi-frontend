import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Search from "../Header/Search/Search";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Typography } from "@mui/material";
import { TbSearch } from "react-icons/tb";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import "./Header.scss";
import Cart from "../Cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

function Header() {
  // eslint-disable-next-line
  const [placeholders, setPlaceholders] = useState([
    `Search "Earphones" `,
    `Search "Buds"`,
    `Search "Neckbands"`,
    `Search 'Headphones"`,
  ]);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useContext(Context);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = placeholders.indexOf(currentPlaceholder);
      const nextIndex = (currentIndex + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPlaceholder, placeholders]);

  //search functionality
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary main-header">
        <Container fluid>
          <Navbar.Brand href="#" className="brand-logo ">
            <Link to="/">
              <Typography className="gradient-text" variant="h4">
                Kohli
              </Typography>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/">
                <Nav.Link href="#action1">Home</Nav.Link>
              </Link>
              <Link to="/about">
                <Nav.Link href="#">About</Nav.Link>
              </Link>
              <NavDropdown title="Categories" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3"></NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="right-container">
              <Form className="main-search">
                <Form.Control
                  type="search"
                  placeholder={currentPlaceholder}
                  autoFocus
                  className="me-2 input-search "
                  aria-label="Search"
                  onChange={(e) => {
                    onChange(e);
                  }}
                />

                <div className="search-icon">
                  {showSearch ? (
                    <span
                      onClick={() => setShowSearch(false)}
                      className="cross-main"
                    >
                      <RxCross2 />
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setShowSearch(true);
                      }}
                    >
                      <TbSearch />
                    </span>
                  )}
                </div>
              </Form>
              <div className="like-button">
                <AiOutlineHeart />
              </div>
              <div
                className="cart-button"
                onClick={() => setIsDrawerOpen(true)}
              >
                <AiOutlineShopping />
                <span className="cart-text">{cartItems.length}</span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isDrawerOpen ? (
        <Cart isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      ) : (
        ""
      )}
      {showSearch ? (
        <Search
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          query={query}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
