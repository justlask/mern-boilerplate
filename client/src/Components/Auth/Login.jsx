import React from 'react'
import AuthService from '../../util/AuthService'

const Login = (props) => {
  const service = new AuthService();

  const handleChange = (e) => {  
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login')
  }

  return (
    <div>
      Login Page
      <h1>Log In</h1>
      <form>
        <label htmlFor="username">username</label>
        <input type="text" name="username" placeholder="username" onChange={e => handleChange(e)}/><br></br>
        <label htmlFor="password">password</label>
        <input type="password" name="password" onChange={e => handleChange(e)}/><br></br>
        <input type="submit" value="log in" onClick={e => handleSubmit(e) }/>
      </form>
    </div>
  )
}

export default Login;
