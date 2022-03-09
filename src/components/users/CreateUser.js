import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import  { app } from '../../services/api'
import { MdOutlineArrowBack } from 'react-icons/md'


import { getDatabase, ref, set } from "firebase/database";




const CreateUser = () => {
  let history = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",  
    role : ""
  });

  let { name, email, role} = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const setRole = e => {
      role = e.target.value;
  }

  const onSubmit = async e => {
    e.preventDefault();

    const database = getDatabase(app);
    const userId = Date.now()

    try {
        set(ref(database, 'users/' + userId ), {
            userId,
            name,
            email,
            role
        });

        alert ("User Created Successfully")
        history("/")
    } catch(err) {
        alert ("Failed creating user")
        console.log(err)
    }
    

  }

  return (
    <div className="container">
       <Link to="/" className="link"><h2 className="create-text"><MdOutlineArrowBack className="create-icon"/>Create User</h2></Link> 
      <div className="mx-auto shadow p-5 form-div">
      
        <form onSubmit={e => onSubmit(e)} className='form'>
          <div className="form-group">  
          <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Asabi"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          
          </div>
          <div className="form-group">
          <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="hello@gmail.com"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
          <label className="form-label role">Role</label>
            <select onChange={setRole} id='form' className="select">
                <option defaultValue="string" >User</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
           </select>
          </div>
          <button className="btn btn-color">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
