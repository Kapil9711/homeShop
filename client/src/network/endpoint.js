import request from "./request.js";

export let baseUrl = "https://homeshop-9e2j.onrender.com";

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
  const data = await request(config);
  return data;
};

// delete Cart
export const deleteCartInfo = async (body) => {
  const config = { method: "DELETE", url: ENDPOINT.DELETECART, body };
  const data = await request(config);
  return data;
};

// get products
export const getAllProducts = async () => {
  const config = { method: "GET", url: ENDPOINT.GETPRODUCTS };
  const { data } = await request(config);
  return data;
};

export default ENDPOINT;
