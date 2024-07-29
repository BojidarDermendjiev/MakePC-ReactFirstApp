import React from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";

export default function Main({ page }) {
  return page === "login" ? <Login /> : <Register />;
}
