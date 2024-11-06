"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!(user && token)) {
        router.push("/");
      } else {
        setUser(user);
        setToken(token);
      }
    });
  });

  if (user && token) {
    return <>{children}</>;
  }
  return <Loader />;
};

export default PrivateRoute;
