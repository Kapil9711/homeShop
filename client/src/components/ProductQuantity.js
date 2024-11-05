"use client";
import { ListGroup, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";

const ProductQuantity = ({ product }) => {
  const [qty, setQty] = useState(1);
  return (
    <>
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
    </>
  );
};

export default ProductQuantity;
