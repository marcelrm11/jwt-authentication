import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  console.log("this is your token:", token);

  const handleSumbit = (e) => {
    e.preventDefault();
    actions.login(email, password).then(() => {});
  };
  return (
    <div className="container">
      {token ? (
        <Navigate replace to="/" />
      ) : (
        <form method="post">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSumbit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};
