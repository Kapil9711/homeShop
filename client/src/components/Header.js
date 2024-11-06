"use client"; // Ensures this is a client-side component

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReduxProvider from "./Redux-Provider";
import ENDPOINT from "@/network/endpoint";
import notify from "@/utils/notify";

const Header = () => {
  return (
    <ReduxProvider>
      <HeaderComponent />
    </ReduxProvider>
  );
};

const HeaderComponent = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const router = useRouter();

  // Fetch user information from localStorage on component mount
  useEffect(() => {
    setTimeout(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }, 1000);
  }, []);

  // Handle user logout and redirect
  const handleLogout = async () => {
    const [res, rej] = notify();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    await fetch(ENDPOINT.LOGOUT);
    res("Logout Successful");
    setUserInfo(null);
    router.push("/");
  };

  // Calculate total quantity in cart
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + Number(item.qty),
    0
  );

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>HomeShop</Navbar.Brand>

          {userInfo && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as="div">
                    <Link href="/cart" passHref>
                      <span style={styles.cartLink}>
                        <FaShoppingCart /> Cart
                        {totalCartQuantity > 0 && (
                          <Badge pill bg="success" style={styles.badge}>
                            {totalCartQuantity}
                          </Badge>
                        )}
                      </span>
                    </Link>
                  </Nav.Link>

                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

const styles = {
  cartLink: {
    textDecoration: "none",
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  badge: {
    marginLeft: "5px",
  },
};

export default Header;
