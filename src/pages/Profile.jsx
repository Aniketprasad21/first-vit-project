import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./profile.module.css";

const Profile = () => {
  let logout = () => {
    localStorage.removeItem("userID");
    navigate("/login");
  };

  const id = localStorage.getItem("userID");
  const path = "http://localhost:5000/user/" + id;
  console.log(path);
  console.log();
  let [data, setData] = useState({});

  let [gitData, setGitData] = useState([]);
  useEffect(
    async function fetchData() {

        const response = await axios
          .get(path)
          .then((response) => {
            data = setData(response.data);
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    ,[]
  )

  useEffect(() => {
    async function fetchAuthUser(params) {
       let {data} = await axios.get(`https://api.github.com/users`)
      // let { data } = await axios.get(`localhost:8181/message`);

      console.log(data);
      setGitData(data);
    }

    fetchAuthUser();
  }, []);

  useEffect(() => {
    async function fetchAuthUser(params) {
      let { data } = await axios.get(`http://localhost:5000/user/${id}`);

      console.log(data);
      setData(data);
    }
    fetchAuthUser();
  }, []);
  console.log("---------------------------------");

  console.log(data);

  return (
    <div>
      <h1>Welcome {data?.username}</h1>
      <p>Email : {data?.useremail}</p>
      <p>Mobile : {data?.userPhoneNo}</p>

      {/* <h1>Welcome {data?.id}</h1>
      <p>Email : {data?.name}</p>
      <p>Mobile  : {data?.color}</p> */}

      <button>
        <Link onClick={logout}>logout</Link>
      </button>
      <button>update</button>
      <div style={{ display: "flex" }}>
        {gitData?.map((user) => {
          let { id, name, color, price } = user;

          return (
            <section key={id} id={style.card}>
              <h1>{id}</h1>
              <h1>{name}</h1>
              <h1>{color}</h1>
              <h1>{price}</h1>
              {/* <img src={id} alt="" srcset="" height={200} width={200} /> */}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
