import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  let userId = localStorage.getItem("userID");
  console.log(userId);
  let [userDetails, setUserDetails] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    async function fatchUser() {
      let { data } = await axios.get(`http://localhost:5000/user/${userId}`);
      console.log(data);

      setUserDetails(data);
    }
    fatchUser();
  }, []);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  let updatedFormSubmit = (e) => {
    e.preventDefault();
    console.log("updated value :", userDetails);
    axios
      .put(`http://localhost:5000/user/${userId}`, userDetails)
      .then(() => {
        toast.success("profile updated");
        navigate("/profile");
      })
      .catch(() => {
        toast.error("update failed");
      });
  };

  return (
    <div>
      <form action="" onSubmit={updatedFormSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={userDetails?.username}
            name="username"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="enter email"
            value={userDetails?.useremail}
            readOnly
            name="useremail"
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="text"
            placeholder="enter password"
            value={userDetails?.userpassword}
            name="userpassword"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="">Phone </label>
          <input
            type="tel"
            min={10}
            max={10}
            placeholder="enter phone"
            value={userDetails?.userPhoneNo}
            name="userPhoneNo"
            onChange={handleChange}
          />
        </div>
        <button type="updatedFormSubmit">update</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
