"use client";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loading from "./loading";
import Error from "./error";
import PrivateRoute from "@/components/PrivateRoute";
import { baseUrl, getAllProducts } from "@/network/endpoint";
import { useEffect, useState } from "react";

const HomeScreen = async () => {
  return (
    <PrivateRoute>
      <HomeComponent />
    </PrivateRoute>
  );
};

const HomeComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
