import axios from "axios"

const service = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005/api",
  // baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,

  // baseURL: import.meta.env.VITE_SERVER_URL,
})

// add the token to every request
service.interceptors.request.use((config) => {
  // get the token from localStorage
  const storedToken = localStorage.getItem("authToken")

  if (storedToken) {
    // add the existing token to the headers of the request
    config.headers.Authorization = `Bearer ${storedToken}`
    // config.headers = { Authorization: `Bearer ${storedToken}` }
  }

  return config
})

export default service
