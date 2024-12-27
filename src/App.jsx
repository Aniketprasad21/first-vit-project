import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Admin from "./pages/Admin";
import AdminUpdate from "./pages/AdminUpdate";
const App = () => {
  return (
    <div>
      <Toaster></Toaster>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/updateProfile" element = {
            <PrivateRoute>
              <UpdateProfile></UpdateProfile>
            </PrivateRoute>
          }>
            
          </Route>
        
          <Route path="/admin" element = {
            <PrivateRoute>
              <Admin></Admin>
            </PrivateRoute>
          }>
            
          </Route>
            
            <Route
            path="/adminupdate/:id"
            element = {
              <PrivateRoute>
                <AdminUpdate></AdminUpdate>
              </PrivateRoute>
            }
            />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
