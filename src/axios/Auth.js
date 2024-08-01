import axios from "./axios"

const API = "http://localhost:3000/api"

export const registerRequest = ( user ) =>  axios.post(`/users` , user)
export const loginRequest = (user) => axios.post(`/login` , user)
export const verifyToken = () => axios.get("/verify")