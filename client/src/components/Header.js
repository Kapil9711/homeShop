"use client"; // Ensure this is a client-side component

import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReduxProvider from "./Redux-Provider";
import ENDPOINT from "@/network/endpoint";
import notify from "@/utils/notify";
import { useRouter } from "next/navigation";

const Header = () => {
  return (
    <ReduxProvider>
      <HeaderComponent />
    </ReduxProvider>
  );
};

const HeaderComponent = () => {
  const [userInfo, setUserInfo] = useState(null); // User info state
  const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        setUserInfo(user);
      }
    }, 100);
  }, []);

  // Handle logout and routing
  const handleLogout = async () => {
    const [res, rej] = notify();
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");
    await fetch(ENDPOINT.LOGOUT);
    res("Logout Successfully");
    setUserInfo(null);
    router.push("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>HomeShop</Navbar.Brand>
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
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
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
