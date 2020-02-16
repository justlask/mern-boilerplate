import axios from 'axios';

class axiosService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  examplefunc = () => {
    return this.service.get('/whatever', {whatever})
    .then(response => response.data)
    .catch(err => console.log(err))
  }
}

export default axiosService;