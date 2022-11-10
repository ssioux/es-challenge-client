import axios from "axios";

const service = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
    
});

// Find Token and includes in.
service.interceptors.request.use((config) => {
  
    // 1. buscar el token en localStorage
    const authToken = localStorage.getItem("authToken")
  
    const tokenFull = `Bearer ${authToken}`
  
    // 2. anexar el toke a la solicitud
    if (authToken) {
      config.headers.authorization = tokenFull
    }
  
    return config
  })
  

export default service;
