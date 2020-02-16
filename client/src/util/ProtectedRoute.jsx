import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({component: Component, user, updateUser, ...rest}) => {
  return (
    <Route 
      {...rest}
        render={ (props) => {
          if (user) {
            return <Component {...props} user={user} updateUser={updateUser} />
          } else {
            return <Redirect to={{pathname: '/', state: {from: props.location}}} />
          }
        }
      }
    />
  )
}

export default ProtectedRoute;
