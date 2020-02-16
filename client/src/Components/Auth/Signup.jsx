import React, { useState } from 'react'
import AuthService from '../../util/AuthService'

const Signup = (props) => {
  const service = new AuthService();
  const [ user, updateUser ] = useState(null)

  const handleChange = (e) => {  
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('signin')
  }

  return (
    <div>
      Signup Page
      <h1>Signup</h1>
      <form>
        <label htmlFor="username">username</label>
        <input type="text" name="username" placeholder="username" onChange={handleChange}/><br></br>
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={(e) => handleChange(e)}/><br></br>
        <input type="submit" value="sign up" onClick={(e) => handleSignup(e)}/>
      </form>
    </div>
  )
}

export default Signup;
