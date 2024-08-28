import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Signin.module.css";
import AuthContext from "../AuthContext";
import anime from "animejs"; // Import animejs

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  function loggedin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    // Function to create particles
    const createParticles = () => {
      const numParticles = 50;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.getElementById('background-animation').appendChild(particle);

        const size = Math.random() * 10 + 5;
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        const color = ['#5cb85c', '#4cae4c', '#008cba', '#0056b3'][Math.floor(Math.random() * 4)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.left = `${initialX}px`;
        particle.style.top = `${initialY}px`;

        anime({
          targets: particle,
          translateX: [
            { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
            { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
          ],
          translateY: [
            { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' },
            { value: () => `+=${Math.random() * 200 - 100}`, easing: 'linear' }
          ],
          opacity: [
            { value: 1 },
            { value: 0, duration: 1500, delay: 200, easing: 'easeOutQuad' }
          ],
          duration: () => Math.random() * 5000 + 2000,
          loop: true,
          easing: 'linear'
        });
      }
    };

    createParticles();

    // Cleanup animation on component unmount
    return () => {
      const container = document.getElementById('background-animation');
      if (container) {
        container.innerHTML = ''; // Remove particles on unmount
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className={style.signin}>
      <div id="background-animation"></div>
      <div className={style.nav}>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/signin">Signin</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <form onSubmit={loggedin}>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
