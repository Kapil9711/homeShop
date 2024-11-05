import request from "./request.js";
export let baseUrl = "http://localhost:8000";

const ENDPOINT = {
  LOGIN: `${baseUrl}/auth/google`,
  LOGOUT: `${baseUrl}/auth/logout`,
  CREATECART: `${baseUrl}/cart/new`,
  DELETECART: `${baseUrl}/cart`,
  GETPRODUCTS: `${baseUrl}/products`,
};

// create Cart
export const uploadCartInfo = async (body) => {
  const config = { method: "POST", url: ENDPOINT.CREATECART, body };
  console.log(config);
  const data = await request(config);
  return data;
};

// delete Cart
export const deleteCartInfo = async (body) => {
  const config = { method: "DELETE", url: ENDPOINT.DELETECART, body };
  const data = await request(config);
  return data;
};

export default ENDPOINT;
