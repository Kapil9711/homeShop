"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import styles from "./page.module.css";

const Home = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle login click and redirect to the Google authentication route
  const handleLogin = () => {
    let token = localStorage.getItem("token");
    if (token) return router.push("/products");
    window.location.href = "http://localhost:8000/auth/google";
  };
  useEffect(() => {
    // Extract token and user from URL params only if they exist

    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (token && user) {
      // Store the JWT token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to /products page
      router.push("/products");
    }
  }, [searchParams, router]); // Depend on searchParams and router for effect triggers
  return (
    <div className={styles.homeContainer}>
      <h1>Welcome to the HomeShop</h1>
      <button onClick={handleLogin}>
        <span>
          <FaGoogle />
        </span>
        Continue with Google
      </button>
    </div>
  );
};

export default Home;
