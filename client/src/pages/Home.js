
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Cookies from 'universal-cookie';

export default function Home() {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // redirect when login is successful
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard")
    }
  }, [isLoggedIn, navigate])

  function signUp(e) {
    e.preventDefault();

    // form validation goes here 

    fetch("http://localhost:3001/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname: document.getElementById("s-fname").value,
          mname: document.getElementById("s-mname").value,
          lname: document.getElementById("s-lname").value,
          email: document.getElementById("s-email").value,
          studentno: document.getElementById("s-studno").value,
          password: document.getElementById("s-password").value
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          alert("Successfully sign up!")
        }
        else { alert("Sign up failed")}
      })
  }

  function logIn(e) {
    e.preventDefault();

    // form validation goes here

    fetch("http://localhost:3001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: document.getElementById("l-email").value,
          password: document.getElementById("l-password").value
        })
      })
      .then(response => response.json())
      .then(body => {
        if (body.success) {
          setIsLoggedIn(true)
          // successful log in. store the token as a cookie
          const cookies = new Cookies()
          cookies.set(
            "authToken",
            body.token,
            {
              path: "localhost:3001/",
              age: 60*60,
              sameSite: false
            });

          localStorage.setItem("username", body.fname);
        }
        else { alert("Log in failed")}
      })
  }
  
  return (
    <>
      <h1>Sign Up</h1>
      <form id="sign-up" onSubmit={signUp}>
        <input id="s-fname" placeholder="First name" required/>
        <input id="s-mname" placeholder="Middle name" />
        <input id="s-lname" placeholder="Last name" required/>
        <input id="s-email" placeholder="UP Mail" pattern="[a-zA-Z0-9._%+-]+@up\.edu\.ph" title="Only UP mail allowed" required/>
        <input id="s-studno" placeholder="Student Number" pattern="\d{4}-\d{5}" title='Format must be 202X-XXXXX' required/>
        <input id="s-password" type="password" placeholder="password" required/>
        <button type='submit'>Sign Up</button>
      </form>

      <h1>Log In</h1>
      <form id="log-in" onSubmit={logIn}>
        <input id="l-email" placeholder="UP Mail" pattern="[a-zA-Z0-9._%+-]+@up\.edu\.ph" title="Only UP mail allowed" required/>
        <input id="l-password" type="password" placeholder="password" required/>
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}