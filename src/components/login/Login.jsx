import React from "react";
import './Login.css'

export default function Login() {

  return(
    <form id="login-form">
      <label>Username</label>
      <input type="text" placeholder="Username" />
      <label>Password</label>
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
