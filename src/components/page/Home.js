import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { app } from '../../services/api'
import { getDatabase, ref, onValue, remove} from "firebase/database";
import { BiEditAlt } from 'react-icons/bi'
import { IoIosAdd } from 'react-icons/io'
import { MdDeleteOutline } from "react-icons/md";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers()
  },[]);

  const loadUsers = () => {
    const database = getDatabase(app);
    const users = ref(database, '/users');

    onValue(users, (snapshot) => {
        const data = snapshot.val();
        const users = Object.keys(data).map(key => {
            return data[key]
        })

        console.log('Records: ', users);
        setUser(users);
    });
  };

  const deleteUser = (id) => {
    const database = getDatabase(app);
    remove(ref(database, 'users/' + id ))
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="home-header">
        <h1>Users</h1>
        <Link className="btn btn-outline-light" to="/users/add"><h3><IoIosAdd/> Create User</h3></Link>
        </div>
        <table className="table  shadow ">
          <thead className="thead-dark table-box">
            <tr className="tr"> 
              <th scope="col">Name</th>
              <th scope="col">Email</th> 
              <th scope="col">Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
                  <tr key={index}>
                <td className="name">{user.name}</td>
                <td className="email">{user.email}</td>
                <td className="user-role">{user.role}</td>
                <td >
                  <Link
                    className="btn  mr-2"
                    to={`/users/edit/${user.userId}`}
                  >
                  <BiEditAlt className="actions"/>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => deleteUser(user.userId)}
                  >
                  <MdDeleteOutline className="actions"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
