"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const router = useRouter();
  useEffect(() => {
    if (!(user && token)) {
      router.push("/");
    }
  }, [user, token]);

  if (user && token) {
    return <>{children}</>;
  }
  return <Loader />;
};

export default PrivateRoute;
