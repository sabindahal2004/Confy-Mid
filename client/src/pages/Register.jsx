import React, { useState } from 'react';
import '../stylesheets/Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [popupMessage, setPopupMessage] = useState("");
  const navigator = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      setPopupMessage("Please fill in all fields.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/user/register", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    });
    
    const data = await res.json();

    if (res.ok) {
      navigator("/login");
    } else {
      setPopupMessage(data.popupMessage || "Invalid email format");
    }
  }

  return (
    <div className="center">
      <div className="container">
        <div className="text">Register Form</div>
        
        <form>
          <div className="data">
            <label>Name</label>
            <input type="text" name={'name'} required onChange={handleChange} value={user.name} />
          </div>
          <div className="data">
            <label>Email</label>
            <input type={'email'} name={'email'} required onChange={handleChange}/>
          </div>
          <div className="data">
            <label>Password</label>
            <input type={'password'} name={'password'} required onChange={handleChange} value={user.password} />
          </div>
          {popupMessage && <div className="popup-message">{popupMessage}</div>}
          <div className="btn">
            <div className="inner"></div>
            <button type="submit" onClick={handleSubmit}>Register</button>
          </div>
          
          <div className="signup-link">
            Not a member? <Link to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
