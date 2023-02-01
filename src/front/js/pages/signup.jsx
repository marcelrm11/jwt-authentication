import React, { useState } from "react";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSumbit = (e) => {
    e.preventDefault();
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(
      "https://3001-marcelrm11-jwtauthentic-oozd3qpz0fl.ws-eu84.gitpod.io/token",
      opts
    )
      .then((res) => {
        if (res.status === 200) return res.json();
        else alert("Ooops... something went wrong");
      })
      //   .then((data) => sessionStorage.setItem("token", data))
      .catch((e) => "Error: " + e);
  };
  return (
    <div className="container">
      <form action="/token" method="post">
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
        <button type="submit" onSubmit={handleSumbit}>
          Signup
        </button>
      </form>
    </div>
  );
};
