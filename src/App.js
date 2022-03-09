import './App.css';
import Home from './components/page/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import { 
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import  CreateUser from './components/users/CreateUser';
import UpdateUser from './components/users/UpdateUser';
import Navbar from './components/layout/Navbar';
import React from 'react';

const App = () => {
  return(
    <Router>
      <div className='App'>
      <Navbar/>
      <Routes>
      <Route  path="/" element={<Home/>} />
          <Route path="/users/add" element={<CreateUser/>} />
          <Route  path="/users/edit/:id" element={<UpdateUser/>} />

      </Routes>
      </div>
    </Router>
  )
}

export default App
