import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }



  signup = (username, password) => {
    return this.service.post('/auth/signup', {username, password})
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  login = (usernmae, password) => {
    return this.service.post('/auth/login', {username, password})
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
    .then(response => response.data)
    .catch(err => console.log(err))
  }

  logout = () => {
    return this.service.post('/auth/logout')
    .then(response => response.data)
    .catch(err => console.log(err))
  }
}

export default AuthService;