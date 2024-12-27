import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Navbar = () => {
  let userID = localStorage.getItem("userID");
  // console.log(userID, "Navbar");
  let navigate = useNavigate();

  let logout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };


  
 let deleteProfile = ()=>{
  let confirmationVal = confirm("are you sure?");
  console.log(confirmationVal);

  if(confirmationVal){
    axios.delete(`http://localhost:5000/user/${userID}`).then(()=>{
      toast.success("account deleted")
      localStorage.removeItem("userID")
      navigate("/register")
    }).catch(()=>{
      toast.error("something went wrong")
    })
  }
  
  

 }

  return (
    <nav>
      <aside className={style.logo}>logo</aside>
      <ul className={style.menu}>
        <li>
          <a href="/">home</a>
        </li>
        <li>
          <a href="/about">about</a>
        </li>

        {userID ? (
          <>
            
            <li className={style.drop}>
              <Link to="/profile">profile</Link>
              <ul className={style.dropdown}>
                <li><Link to="/updateProfile">update</Link> </li>
                <li><Link onClick={deleteProfile}>delete</Link>  </li>
                <li onClick={logout}>logout</li>
              </ul>
            </li>
           
          </>
        ) : (
          <>
            <li>
              <a href="/login">login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
