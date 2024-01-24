import React, { createContext, useState } from "react";
import './stylesheets/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CreatePost from './pages/CreatePost';
import UpdatePost from "./pages/UpdatePost";
export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState(null);
  const [refresh,setRefresh] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth,refresh,setRefresh }}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
