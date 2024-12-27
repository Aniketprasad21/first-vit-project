import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Admin = () => {
  let [allUsers, setAllUsers] = useState(null);
  let [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function fetchAllRegisteredUser() {
      let { data } = await axios.get("http://localhost:5000/user");
      console.log(data);
      setAllUsers(data);
    }
    fetchAllRegisteredUser();
  },[toggle]);

  let deleteUser = (x) => {
    console.log("delete", x);
    axios
      .delete(`http://localhost:5000/user/${x}`)
      .then(() => {
        toast.success("Deleted user");
        setToggle(!toggle)
      })
      .catch(() => {});
  };
  return (
    <div>
      <h1>admin panel</h1>

      {allUsers?.map(
        ({ id, username, useremail, userpassword, userPhoneNo }) => {
          if (useremail != "admin@gmail.com"){
            return (
              <section key={id}>
                <h1>{username}</h1>
                <p>Email : {useremail}</p>
                <p>Password : {userpassword}</p>
                <p> phone : {userPhoneNo}</p>
                <button><Link to = {`/adminupdate/${id}`}>update</Link></button>
                <button onClick={(x) => deleteUser(id)}>delete</button>
              </section>
            );
          }
          
        }
      )}
    </div>
  );
};

export default Admin;
