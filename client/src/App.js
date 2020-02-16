import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import AuthService from './util/AuthService';
import ProtectedRoute from './util/ProtectedRoute';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard';

function App() {
  const service = new AuthService();
  const [ user, updateUser ] = useState(null);

  const fetchUser = () => {
    if( user === null ){
      service.loggedin()
      .then(response =>{
        updateUser(response);
      })
      .catch( err =>{
        updateUser(false)
      })
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);


  const logoutUser = () => {
    service.logout()
    .then(data => {
      updateUser(null);
    })
  }

  return (
    <div className="App">
      <Navbar user={user} logoutUser={logoutUser}/>
      <Switch>
        <Route exact path='/' render={(props) => <Home user={user} {...props} updateUser={updateUser}/>}></Route>
        <Route exact path="/signup" render={(props) => <Signup user={user} {...props} updateUser={updateUser} />}></Route>
        <Route exact path="/login" render={(props) => <Login user={user} {...props} updateUser={updateUser} />}></Route>
        <ProtectedRoute user={user} updateUser={updateUser} exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
