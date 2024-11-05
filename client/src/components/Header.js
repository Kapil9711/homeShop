"use client";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const cartItems = [1];
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
                      <Link href="/cart">
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
