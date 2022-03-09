import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams}  from "react-router-dom";
import { getDatabase, ref, update, onValue } from "firebase/database";
import { app } from "../../services/api";
import { MdOutlineArrowBack } from "react-icons/md";


const UpdateUser = () => {
  let history = useNavigate();
  const { id } = useParams();
const [user, setUser ] = useState({
    name: "",
    email: "",
    role: ''
  });


  const setRole =[
      "admin", "user"
  ]
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUser = () => {
        console.log('Params id: ', id);
        //api 
        const database = getDatabase(app);
         let user = ref(database, 'users/'+ id);
        onValue(user, (snapshot) => {
            const data = snapshot.val();
            console.log('User Records: ', data);
            user  = data
            setUser(data)
        });
  
    };
    

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onSubmit = e => {
    e.preventDefault();
    updateUser(id)
  };
 
  
      const updateUser = (id) => {
        const database = getDatabase(app);
        const userUpdate = {};
         userUpdate[id] = user;

         console.log(userUpdate)
        try {
         update(ref(database, 'users/'), userUpdate)
        alert ("User Update Successfully")
        history("/")
        } catch(err){
            console.log(err)
            alert ("User Update Failed")
        }
      };
    

  return (
    <div className="container"> 
    <Link to='/' className="link"><h2 className="create-text"><MdOutlineArrowBack className="create-icon"/>Update User</h2></Link>  
      <div className="w-75 mx-auto shadow p-5 form-div">
   
        <form onSubmit={e => onSubmit(e)} className="form">
          <div className="form-group">
          <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="name"
              onChange={onInputChange}
              value={user.name}
            />
          </div>
          <div className="form-group">
          <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="email"
              onChange={onInputChange}
              value={user.email}
            />
          </div>
          <div className="form-group">
          <label className="form-label role">Role</label>
            <select onChange={onInputChange} name="role" id='form' className="select">
                <option defaultValue="string" >User</option>
                {setRole.map((role, index) => ( 
                    <option selected={role.toLowerCase() === user.role.toLowerCase()} value={role} key={index}>{role}</option>
                ))}
           </select>
          </div>
          <button className="btn btn-color" >Update User</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;

