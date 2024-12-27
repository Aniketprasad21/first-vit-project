import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let [loginUser, setLoginUSer] = useState({
    useremail: "",
    userpassword: "",
  });

  let navigate = useNavigate();

  let [allRegisteredUser, setAllRegisteredUser] = useState(null);

  useEffect(() => {
    async function fetchRegisterdUser() {
      let { data } = await axios.get("http://localhost:5000/user");
      setAllRegisteredUser(data);
    }
    fetchRegisterdUser();
  }, []);

  let loginHandle = (e) => {
    let { name, value } = e.target;

    setLoginUSer({ ...loginUser, [name]: value });
  };

  let loginSubmit = (e) => {
    e.preventDefault();

    let authUser = allRegisteredUser.find((user) => {
      return (
        user.useremail === loginUser.useremail &&
        user.userpassword === loginUser.userpassword
      );
    });

    console.log(authUser);

    if(authUser.useremail === "admin@gmail.com" && authUser.userpassword ==="admin123"){
      toast.success("welcome")
      localStorage.setItem("userID",authUser.id);
      navigate("/admin")
    }else if (authUser) {
      toast.success(`welcome ${authUser.username}`);
      localStorage.setItem("userID", authUser.id);

      navigate("/profile");
    } else {
      toast.error("access denied");
    }
  };
  return (
    <div>
      <h1>Login pge</h1>
      <div>
        <form action="">
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="enter email"
              name="useremail"
              value={loginUser.useremail}
              onChange={loginHandle}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="text"
              placeholder="enter password"
              name="userpassword"
              value={loginUser.userpassword}
              onChange={loginHandle}
            />
          </div>

          <input type="submit" value="Login" onClick={loginSubmit} />
        </form>
      </div>
    </div>
  );
};

export default Login;
