"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import Link from "next/link";
import ReduxProvider from "../../components/Redux-Provider";
import { uploadCartInfo, deleteCartInfo } from "../../network/endpoint";
import notify from "@/utils/notify";
import PrivateRoute from "@/components/PrivateRoute";

const CartScreen = () => {
  return (
    <PrivateRoute>
      <ReduxProvider>
        <CartComponent />
      </ReduxProvider>
    </PrivateRoute>
  );
};

const CartComponent = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // add to cart
  const addToCartHandler = async (product, qty) => {
    const [res, rej] = notify();
    dispatch(addToCart({ ...product, qty }));
    const data = await uploadCartInfo({ productId: product._id, qty });
    if (data.success) res("Updated Successfully");
    else rej("Something went wrong");
  };

  // remove from cart
  const removeFromCartHandler = async (id) => {
    const [res, rej] = notify();
    dispatch(removeFromCart(id));
    const data = await deleteCartInfo({ productId: id });
    if (data.success) res("Removed from Cart");
    else rej("Something went wrong");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h1>
            Your cart is empty <Link href="/products">Go Back</Link>
          </h1>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link href={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
