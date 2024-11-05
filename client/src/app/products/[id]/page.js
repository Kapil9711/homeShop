"use client";
import Link from "next/link";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "@/components/Rating.js";
import Loading from "../loading.js";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/router";
import ReduxProvider from "@/components/Redux-Provider.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slices/cartSlice.js";
import { uploadCartInfo } from "@/network/endpoint.js";
import ENDPOINT from "../../../network/endpoint.js";

const ProductScreen = ({ params }) => {
  const { id } = use(params);
  return (
    <ReduxProvider>
      <ProductComponent id={id} />
    </ReduxProvider>
  );
};

const ProductComponent = ({ id }) => {
  let [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const addToCartHandler = async () => {
    dispatch(addToCart({ ...product, qty }));
    const data = await uploadCartInfo({ productId: product._id, qty });
    console.log(data);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${ENDPOINT.GETPRODUCTS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (err) {}
    };
    getData();
  }, []);

  // Loading state will be handled automatically for async fetching
  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <Link className="btn btn-light my-3" href="/products">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Qty Select */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Link style={{ color: "white" }} href={"/cart"}>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProductScreen;
