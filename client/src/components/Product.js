"use client";
import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link href={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link href={`/products/${product._id}`}>
          <Card.Title className="product-title" as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
