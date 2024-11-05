"use client";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReduxProvider from "./Redux-Provider";

const Header = () => {
  return (
    <ReduxProvider>
      <HeaderComponent />
    </ReduxProvider>
  );
};

const HeaderComponent = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  console.log(userInfo, userInfo?.name);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Container>
            <Navbar.Brand>HomeShop</Navbar.Brand>
          </Container>
          {userInfo ? (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Container>
                    <Nav.Link>
                      <Link style={{ textDecoration: "none" }} href="/cart">
                        <span
                          style={{
                            display: "flex",
                            gap: "4px",
                            alignItems: "center",
                          }}
                        >
                          <FaShoppingCart /> Cart
                          {cartItems.length > 0 && (
                            <Badge
                              pill
                              bg="success"
                              style={{ marginLeft: "5px" }}
                            >
                              {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                            </Badge>
                          )}
                        </span>
                      </Link>
                    </Nav.Link>
                  </Container>

                  <NavDropdown title={userInfo["name"]} id="username">
                    <NavDropdown.Item>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            ""
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
