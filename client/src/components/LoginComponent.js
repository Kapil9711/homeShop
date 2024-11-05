// "use client";
// import Link from "next/link";
// import { useNavigate } from "next/navigation";
// import { GoogleLogin } from "@react-oauth/google";
// const LoginComponent = () => {
//   const navigate = useNavigate();
//   // This will be called after successful Google login
//   const handleLoginSuccess = async (response) => {
//     console.log(response);
//     try {
//       // Send the token to your backend to validate and get a JWT token
//       const res = await axios.post("/api/auth/google", {
//         token: response.credential,
//       });

//       // Assuming the response includes the JWT token and a redirect URL
//       const { token, redirectUrl } = res.data;
//       // Store the JWT token for future use (e.g., in localStorage or context)
//       localStorage.setItem("token", token);
//       // Redirect the user to the products page (or any other URL you need)
//       navigate("/products");
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   // Handle login failure (optional)
//   const handleLoginFailure = (error) => {
//     console.error("Login failed:", error);
//   };

//   return (
//     <>
//       <GoogleLogin
//         onSuccess={handleLoginSuccess}
//         onError={handleLoginFailure}
//       />
//     </>
//   );
// };

// export default LoginComponent;
