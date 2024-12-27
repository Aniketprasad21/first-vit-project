import axios from 'axios';
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
const AdminUpdate = () => {
    let [updateUser,setUpdateUser] = useState(null);
    // fetching dynamic id from url
    let {id} = useParams();
    console.log(id);

useEffect(()=>{
    async function fetchUpdateUser(){
        let {data} = await axios.get (`https://localhost:5000/users/${id}`);
        console.log(data);
        setUpdateUser(data);// storing into state
        
    }
    fetchUpdateUser();
},[]);
  return (
    <div>
      <h1>Admin Update</h1>
      <form onSubmit={formSubmit}>
        <div>

            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter name' name='username'  value={RegisterUser?.username} onChange={RegisterHandle}/>
        </div>
        <div>

            <label htmlFor="">
            Email
            </label>
            <input type="text" placeholder='enter email' name='useremail'  value={RegisterUser.useremail} onChange={RegisterHandle}/>
        </div>
        <div>

            <label htmlFor="">Password</label>
            <input type="text" placeholder='enter password'  name='userpassword'  value={RegisterUser.userpassword} onChange={RegisterHandle}/>
        </div>
        <div>

            <label htmlFor="">Phone </label>
            <input type="tel" min={10} max={10} placeholder='enter phone'  name='userPhoneNo'  value={RegisterUser.userPhoneNo} onChange={RegisterHandle}/>
        </div>
<input type="submit" onClick={registerSubmit} />
      </form>
    </div>
  );
};

export default AdminUpdate;
