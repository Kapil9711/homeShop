import axios from "axios";

const request = async (httpConfig) => {
  const token = localStorage.getItem("token");
  const { method = "GET", url, body } = httpConfig;
  try {
    const { data } = await axios.request({
      method,
      url,
      data: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export default request;
