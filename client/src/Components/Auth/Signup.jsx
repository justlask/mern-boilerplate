import React, { useState } from 'react';
import AuthService from '../../util/AuthService';
import FlashMessage from '../FlashMessage';

const Signup = (props) => {
  const service = new AuthService();
  const [ user, updateUser ] = useState(null);
  const [ isVisable, setVisable ] = useState(false);
  const [ message, setMessage ] = useState(null);

  const handleError = (error) => {
    setMessage(error.response.data.message)
    setVisable(true)

    setTimeout(() => setVisable(false), 4000)
  }

  const handleChange = (e) => {  
    updateUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();
    service.signup(user.username, user.password)
    .then(response => {
      props.updateUser(response)
      props.history.push('/dashboard')
    })
    .catch(err => {
      handleError(err);
    })
  }

  return (
    <div>
      Signup Page
      <h1>Signup</h1>
      <form>
        <label htmlFor="username">username</label>
        <input type="text" name="username" placeholder="username" onChange={handleChange} /><br></br>
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={(e) => handleChange(e)}/><br></br>
        <FlashMessage isVisable={isVisable} setVisable={setVisable} message={message} />
        <input type="submit" value="sign up" onClick={(e) => handleSignup(e)} />
      </form>
    </div>
  )
}

export default Signup;
