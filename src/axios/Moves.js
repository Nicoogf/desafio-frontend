import axios from "./axios"

export const getMovesRequest = () => axios.get(`/account/${userid}/activity`)