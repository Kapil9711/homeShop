import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import Loading from "./loading";
import Error from "./error";

async function fetchData() {
  try {
    const res = await fetch("http://localhost:8000/api/products", {
      next: { revalidate: 60 }, // Optional: Revalidate every 60 seconds (ISR)
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Error fetching data: " + error.message);
  }
}

const HomeScreen = async () => {
  let products;
  let error;

  try {
    products = await fetchData();
  } catch (err) {
    error = err.message;
  }

  // Loading state will be handled automatically for async fetching
  if (!products && !error) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
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
