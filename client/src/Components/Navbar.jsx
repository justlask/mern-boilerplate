import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = (props) => {
  if (props.user) {
    return (
      <header>
        <Link to="/"><h1>Your App Name Here</h1></Link>
        <nav>
        <a href="/"><button onClick={props.logoutUser}>logout</button></a>
        </nav>
      </header>
    )
  }
  else {
    return (
      <header>
        <Link to="/"><h1>Your App Name Here</h1></Link>
        <nav>
          <NavLink activeClassName="is-active" to="/signup">Sign Up</NavLink>
          <NavLink activeClassName="is-active" to="/login">Log In</NavLink>
        </nav>
      </header>
    )
  }
}

export default Navbar
