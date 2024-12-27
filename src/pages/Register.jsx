import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Register = () => {
 
  let[RegisterUser,setRegisterUser] = useState({
    username:"",
    useremail:"",
    userpassword:"",
    userPhoneNo:""
  });
let navigate = useNavigate();

 const RegisterHandle=(e)=>{
    let {name,value} = e.target;
    setRegisterUser({...RegisterUser,[name]:value});
  }

  let registerSubmit = (e)=>{
e.preventDefault();

console.log(RegisterUser);

axios.post("http://localhost:5000/user",RegisterUser).then(()=>{
  toast.success("successfully registered")
  setRegisterUser({
    username:"",
    useremail:"",
    userpassword:"",
    userPhoneNo:""

  })
  navigate("/login")
}).catch(()=>{
  toast.error("not registered")
});

  };
  return (
    <div>
      
      <form action="">

        <div>

            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter name' name='username'  value={RegisterUser.username} onChange={RegisterHandle}/>
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
  )
}

export default Register
